import { apiClient } from './client';
import { Course, Instructor } from '../../types/course.types';

// Helper to format course and inject reliable images
const formatCourseData = (course: any, instructor?: Instructor): Course => {
  // Generate a reliable image URL using the course ID as a seed for consistent images across sessions
  const reliableImage = `https://picsum.photos/seed/${course.id || 1}/400/200`;
  return {
    ...course,
    thumbnail: reliableImage,
    images: [reliableImage],
    instructor: instructor || undefined
  } as Course;
};

export const fetchCourses = async (page: number = 1, limit: number = 20): Promise<Course[]> => {
  // Fetch both courses and dummy instructors in parallel directly at the API layer
  const [coursesRes, instructorsRes] = await Promise.all([
    apiClient.get(`/api/v1/public/randomproducts?page=${page}&limit=${limit}`),
    apiClient.get(`/api/v1/public/randomusers?page=${page}&limit=${limit}`)
  ]);

  // Extract raw data from responses and map courses to include instructor info, ensuring consistent images using the course ID as a seed for the image URL
  const rawCourses = coursesRes.data.data.data;
  // The FreeAPI returns 500 users, so we can safely use the course ID to assign a deterministic instructor without worrying about running out of users
  const rawInstructors = instructorsRes.data.data.data;

  // Map courses and attach instructors here, not in the store
  return rawCourses.map((course: any, index: number) => 
    formatCourseData(course, rawInstructors[index % rawInstructors.length])
  );
};

export const fetchCourseById = async (id: number): Promise<Course> => {
  // Fetch specific course and a deterministic dummy instructor
  const [courseRes, instructorRes] = await Promise.all([
    apiClient.get(`/api/v1/public/randomproducts/${id}`),
    // Fallback to user 1 if id is somehow too large, but FreeAPI has 500 users
    apiClient.get(`/api/v1/public/randomusers/${id}`)
  ]);

  // Format the course data and inject the instructor info, ensuring a consistent image using the course ID as a seed for the image URL
  return formatCourseData(courseRes.data.data, instructorRes.data.data);
};