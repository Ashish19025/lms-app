import { apiClient } from './client';
import { Course, Instructor } from '../../types/course.types';

export const fetchCourses = async (page: number = 1, limit: number = 20) => {
  const response = await apiClient.get(`/api/v1/public/randomproducts?page=${page}&limit=${limit}`);
  
  // Transform API response to match Course type
  // The API returns thumbnail, but our type expects images array
  const courses = response.data.data.data.map((course: any) => ({
    ...course,
    images: course.thumbnail ? [course.thumbnail] : []
  })) as Course[];
  
  return courses;
};

export const fetchInstructors = async (page: number = 1, limit: number = 20) => {
  const response = await apiClient.get(`/api/v1/public/randomusers?page=${page}&limit=${limit}`);
  return response.data.data.data as Instructor[];
};