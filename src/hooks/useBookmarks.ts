import { useAppStore } from '../store/app.store';
import { useCallback } from 'react';

export function useBookmarks() {
  // Extract bookmarked course IDs and the function to toggle bookmarks from the app store
  const { bookmarkedIds, toggleBookmark } = useAppStore();
  // Define a function to check if a specific course ID is currently bookmarked, using useCallback for memoization
  const isBookmarked = useCallback((courseId: string | number) => {
    return bookmarkedIds.includes(Number(courseId));
  }, [bookmarkedIds]);  
  // Return the list of bookmarked IDs, the function to toggle bookmarks, and the function to check if a course is bookmarked
  return {
    bookmarkedIds,
    toggleBookmark,
    isBookmarked
  };
}
