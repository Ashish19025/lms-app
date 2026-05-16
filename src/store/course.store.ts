import { create } from 'zustand';
import { Course } from '../types/course.types';
import { fetchCourses, fetchCourseById } from '../services/api/course.api';

interface CourseState {
  courses: Course[];
  filteredCourses: Course[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  loadCourses: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  getCourseById: (id: number) => Course | undefined;
  getOrFetchCourse: (id: number) => Promise<Course | undefined>;
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
      const coursesData = await fetchCourses(1, 20);

      set({ 
        courses: coursesData,
        filteredCourses: coursesData,
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

      const filtered = courses.filter((course) => {
        const inTitle = course.title.toLowerCase().includes(lowerQuery);        
        const inBrand = course.brand?.toLowerCase().includes(lowerQuery);       
        const inInstructor = !!course.instructor &&
          `${course.instructor.name.first} ${course.instructor.name.last}`      
            .toLowerCase()
            .includes(lowerQuery);

        return inTitle || inBrand || inInstructor;
      });

    set({ searchQuery: query, filteredCourses: filtered });
  },

  getCourseById: (id: number) => {
    return get().courses.find(c => c.id === id);
  },

  getOrFetchCourse: async (id: number) => {
    // 1. Check cache first
    const existing = get().courses.find(c => c.id === id);
    if (existing) return existing;

    // 2. Fetch from API if not in cache
    try {
      const fetchedCourse = await fetchCourseById(id);
      
      set(state => ({
        courses: [...state.courses, fetchedCourse]
      }));
      
      return fetchedCourse;
    } catch (error) {
      console.error('Failed to fetch individual course:', error);
      return undefined;
    }
  }
}));