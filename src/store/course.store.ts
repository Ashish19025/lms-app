import { create } from 'zustand';
import { Course } from '../types/course.types';
import { fetchCourses, fetchCourseById } from '../services/api/course.api';
import { storeData, getData } from '../services/storage/asyncStorage';

const PAGE_SIZE = 20;
// Last successfully loaded first page, shown when the app opens offline
const COURSES_CACHE_KEY = '@courses_cache';
let searchTimer: ReturnType<typeof setTimeout> | null = null;

interface CourseState {
  courses: Course[];
  filteredCourses: Course[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  searchQuery: string;
  page: number;
  hasMore: boolean;
  // True when the list on screen came from the offline cache
  isFromCache: boolean;
  loadCourses: () => Promise<void>;
  loadMoreCourses: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  getCourseById: (id: number) => Course | undefined;
  getOrFetchCourse: (id: number) => Promise<Course | undefined>;
}

// Search by title, brand, category or instructor name (case-insensitive)
const filterCourses = (courses: Course[], query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return courses;
  return courses.filter((course) => {
    const instructor = course.instructor
      ? `${course.instructor.name.first} ${course.instructor.name.last}`.toLowerCase()
      : '';
    return (
      course.title.toLowerCase().includes(q) ||
      !!course.brand?.toLowerCase().includes(q) ||
      !!course.category?.toLowerCase().includes(q) ||
      instructor.includes(q)
    );
  });
};

// Merge new courses in without duplicates (ids are unique)
const mergeCourses = (existing: Course[], incoming: Course[]) => {
  const ids = new Set(existing.map((c) => c.id));
  return [...existing, ...incoming.filter((c) => !ids.has(c.id))];
};

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: [],
  filteredCourses: [],
  isLoading: false,
  isLoadingMore: false,
  error: null,
  searchQuery: '',
  page: 1,
  hasMore: true,
  isFromCache: false,

  // Load (or reload) the first page. Falls back to the cached list if the request fails.
  loadCourses: async () => {
    set({ isLoading: true, error: null });
    try {
      const { courses, hasMore } = await fetchCourses(1, PAGE_SIZE);
      set({
        courses,
        filteredCourses: filterCourses(courses, get().searchQuery),
        page: 1,
        hasMore,
        isFromCache: false,
        isLoading: false,
      });
      storeData(COURSES_CACHE_KEY, courses);
    } catch (error: any) {
      const cached: Course[] | null = await getData(COURSES_CACHE_KEY);
      if (cached?.length && get().courses.length === 0) {
        set({
          courses: cached,
          filteredCourses: filterCourses(cached, get().searchQuery),
          hasMore: false,
          isFromCache: true,
        });
      }
      set({ error: error.message || 'Failed to fetch courses', isLoading: false });
    }
  },

  // Infinite scroll: fetch the next page and append it
  loadMoreCourses: async () => {
    const { isLoading, isLoadingMore, hasMore, page, isFromCache } = get();
    if (isLoading || isLoadingMore || !hasMore || isFromCache) return;
    set({ isLoadingMore: true });
    try {
      const next = page + 1;
      const { courses: incoming, hasMore: more } = await fetchCourses(next, PAGE_SIZE);
      const courses = mergeCourses(get().courses, incoming);
      set({
        courses,
        filteredCourses: filterCourses(courses, get().searchQuery),
        page: next,
        hasMore: more,
        isLoadingMore: false,
      });
    } catch {
      set({ isLoadingMore: false });
    }
  },

  // Filter what's loaded right away, then ask the server for matches not loaded yet
  setSearchQuery: (query: string) => {
    set({ searchQuery: query, filteredCourses: filterCourses(get().courses, query) });
    if (searchTimer) clearTimeout(searchTimer);
    const q = query.trim();
    if (q.length < 2) return;
    searchTimer = setTimeout(async () => {
      try {
        const { courses: found } = await fetchCourses(1, 50, q);
        if (get().searchQuery.trim() !== q) return; // user kept typing
        const courses = mergeCourses(get().courses, found);
        set({ courses, filteredCourses: filterCourses(courses, get().searchQuery) });
      } catch {
        // Offline or server error: the local results are already showing
      }
    }, 400);
  },

  getCourseById: (id: number) => get().courses.find((c) => c.id === id),

  // Use the in-memory course if we have it, otherwise fetch it and keep it
  getOrFetchCourse: async (id: number) => {
    const existing = get().courses.find((c) => c.id === id);
    if (existing) return existing;
    try {
      const fetchedCourse = await fetchCourseById(id);
      set((state) => ({ courses: mergeCourses(state.courses, [fetchedCourse]) }));
      return fetchedCourse;
    } catch {
      return undefined;
    }
  },
}));
