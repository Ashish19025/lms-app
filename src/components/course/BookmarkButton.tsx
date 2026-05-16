import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBookmarks } from '../../hooks/useBookmarks';


interface BookmarkButtonProps {
  // courseId - The ID of the course to toggle bookmark status for
  courseId: number;
}

// BookmarkButton - A button component to toggle bookmark status for a course
export const BookmarkButton: React.FC<BookmarkButtonProps> = ({ courseId }) => {
  // Extract bookmark status and toggle function from the useBookmarks hook
  const { isBookmarked, toggleBookmark } = useBookmarks();
  // Determine if the current course is bookmarked
  const bookmarked = isBookmarked(courseId);

  return (
    <TouchableOpacity
      onPress={() => toggleBookmark(courseId)}
      className="p-2 items-center justify-center bg-white/80 rounded-full"
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Ionicons
        name={bookmarked ? 'bookmark' : 'bookmark-outline'}
        size={24}
        color={bookmarked ? '#2563eb' : '#6b7280'}
      />
    </TouchableOpacity>
  );
};