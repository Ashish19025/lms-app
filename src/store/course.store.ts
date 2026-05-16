import { create } from 'zustand';
import { Course } from '../types/course.types';
import { fetchCourses, fetchCourseById } from '../services/api/course.api';

/**
 * Zustand store for managing course data in the LMS app, providing state management for courses, including loading state, error handling, search functionality, and caching of course data to optimize performance and user experience.
 * This store includes functions to load courses from the API, set search queries to filter courses based on title, brand, or instructor, and retrieve individual courses by ID with caching to minimize unnecessary API calls.
 */
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

/** Zustand store for managing course data in the LMS app, providing state management for courses, including loading state, error handling, search functionality, and caching of course data to optimize performance and user experience.
 * This store includes functions to load courses from the API, set search queries to filter courses based on title, brand, or instructor, and retrieve individual courses by ID with caching to minimize unnecessary API calls.
 */
export const useCourseStore = create<CourseState>((set, get) => ({
  courses: [],
  filteredCourses: [],
  isLoading: false,
  error: null,
  searchQuery: '',

  // Function to load Courses from the API
  loadCourses: async () => {
    // Set loading state to true and clear any existing errors before starting the API call to fetch courses
    set({ isLoading: true, error: null });
    //
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

  // Function to set the search query and filter courses based on the query, allowing users to easily find courses by title, brand, or instructor
  setSearchQuery: (query: string) => {
    const { courses } = get();
    const lowerQuery = query.toLowerCase();

    /* If the search query is empty, reset the filtered courses to show all courses. Otherwise, 
    filter the courses based on whether the title, brand, or instructor's name includes the search query (case-insensitive). 
    This allows users to quickly find relevant courses by typing keywords related to the course title, brand, or instructor.
    */
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

  // Function to retrieve a course by its ID from the cached courses in the store, allowing for quick access to course details without needing to make an API call if the course data is already available
  getCourseById: (id: number) => {
    return get().courses.find(c => c.id === id);
  },

  /* Function to retrieve a course by its ID, first checking the cache in the store for the course data. 
  If the course is not found in the cache, it makes an API call to fetch the course details by ID and then updates the store with the newly fetched course data. 
  This approach optimizes performance by minimizing unnecessary API calls and providing quick access to course details when they are already available in the cache.
  */
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