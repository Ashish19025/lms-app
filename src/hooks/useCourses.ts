import { useEffect } from 'react';
import { useCourseStore } from '../store/course.store';

export function useCourses() {
  const { courses, isLoading, error, loadCourses } = useCourseStore();

  useEffect(() => {
    // Only fetch if we don't have courses yet
    if (courses.length === 0 && !isLoading) {
      loadCourses();
    }
  }, []);

  return {
    courses,
    isLoading,
    error,
    refetch: loadCourses
  };
}
