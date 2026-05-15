import { useAppStore } from '../store/app.store';
import { useCallback } from 'react';

export function useBookmarks() {
  const { bookmarkedIds, toggleBookmark } = useAppStore();

  const isBookmarked = useCallback((courseId: string | number) => {
    return bookmarkedIds.includes(Number(courseId));
  }, [bookmarkedIds]);  
  return {
    bookmarkedIds,
    toggleBookmark,
    isBookmarked
  };
}
