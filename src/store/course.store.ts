import { create } from 'zustand';
import { Course, Instructor } from '../types/course.types';
import { fetchCourses, fetchInstructors } from '../services/api/course.api';

interface CourseState {
  courses: Course[];
  filteredCourses: Course[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  loadCourses: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  getCourseById: (id: number) => Course | undefined;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: [],
  filteredCourses: [],
  isLoading: false,
  error: null,
  searchQuery: '',

  loadCourses: async () => {
    set({ isLoading: true, error: null });
    try {
      // Fetch both courses and dummy instructors in parallel
      const [coursesData, instructorsData] = await Promise.all([
        fetchCourses(1, 20),
        fetchInstructors(1, 20)
      ]);

      // Artificially map instructors to courses by index
      const combined = coursesData.map((course, index) => ({
        ...course,
        instructor: instructorsData[index % instructorsData.length]
      }));

      set({ courses: combined,
            filteredCourses: combined,
            isLoading: false 
      });
    } catch (error: any) {
      set({ 
        error: error.message || 'Failed to fetch courses', 
        isLoading: false 
      });
    }
  },

  setSearchQuery: (query: string) => {
    const { courses } = get();
    const lowerQuery = query.toLowerCase();
    
    if (!query.trim()) {
      set({ searchQuery: query, filteredCourses: courses });
      return;
    }

    const filtered = courses.filter(
      (course) => 
        course.title.toLowerCase().includes(lowerQuery) || 
        (course.instructor && `${course.instructor.name.first} ${course.instructor.name.last}`.toLowerCase().includes(lowerQuery))
    );

    set({ searchQuery: query, filteredCourses: filtered });
  },

  getCourseById: (id: number) => {
    return get().courses.find(c => c.id === id);
  }
}));