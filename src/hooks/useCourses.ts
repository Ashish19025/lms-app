import { useEffect } from 'react';
import { useCourseStore } from '../store/course.store';

export function useCourses() {
  // Extract courses, loading state, error state, and the function to load courses from the course store
  const { courses, isLoading, error, loadCourses } = useCourseStore();

  // useEffect to load courses when the component using this hook mounts
  useEffect(() => {
    // Only fetch if we don't have courses yet
    if (courses.length === 0 && !isLoading) {
      loadCourses();
    }
    console.log('Courses in store:', courses);
  }, []);

  // Return the courses, loading state, error state, and a refetch function to allow manual reloading of courses
  return {
    courses,
    isLoading,
    error,
    refetch: loadCourses
  };
}
