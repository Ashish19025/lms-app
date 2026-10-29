jest.mock('../services/storage/asyncStorage', () => ({ storeData: jest.fn(), getData: jest.fn(() => Promise.resolve(null)) }));
jest.mock('../services/api/course.api', () => ({ fetchCourses: jest.fn(() => Promise.reject(new Error('offline'))), fetchCourseById: jest.fn() }));

import { useCourseStore } from '../store/course.store';

describe('Course Store', () => {
  beforeEach(() => {
    useCourseStore.setState({ 
      courses: [], 
      filteredCourses: [],
      searchQuery: '',
      error: null 
    });
  });

  test('should initialize with empty courses', () => {
    const { courses } = useCourseStore.getState();
    expect(courses).toEqual([]);
  });

  test('should have getCourseById function', () => {
    const { getCourseById } = useCourseStore.getState();
    expect(typeof getCourseById).toBe('function');
  });

  test('should return undefined for non-existent course', () => {
    const { getCourseById } = useCourseStore.getState();
    const course = getCourseById(999);
    expect(course).toBeUndefined();
  });

  test('should filter courses by search query', () => {
    useCourseStore.setState({
      courses: [
        { id: 1, title: 'React Basics', description: '', price: 29, discountPercentage: 0, rating: 4.5, stock: 100, brand: '', category: 'web', thumbnail: '', images: [] },
        { id: 2, title: 'Python Advanced', description: '', price: 39, discountPercentage: 0, rating: 4.2, stock: 50, brand: '', category: 'backend', thumbnail: '', images: [] },
      ],
      filteredCourses: [],
    });

    const { setSearchQuery } = useCourseStore.getState();
    setSearchQuery('React');

    const { filteredCourses } = useCourseStore.getState();
    expect(filteredCourses.length).toBe(1);
    expect(filteredCourses[0].title).toBe('React Basics');
  });

  test("loadCourses keeps an error and stays empty when offline with no cache", async () => {
    await useCourseStore.getState().loadCourses();
    const st = useCourseStore.getState();
    expect(st.error).toBe("offline");
    expect(st.isLoading).toBe(false);
    expect(st.courses).toEqual([]);
  });
});
