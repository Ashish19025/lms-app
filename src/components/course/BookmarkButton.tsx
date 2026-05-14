import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useAppStore } from '../../store/app.store';

interface BookmarkButtonProps {
  courseId: number;
}

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({ courseId }) => {
  const bookmarkedIds = useAppStore(state => state.bookmarkedIds);
  const toggleBookmark = useAppStore(state => state.toggleBookmark);
  const isBookmarked = bookmarkedIds.includes(courseId);

  return (
    <TouchableOpacity 
      onPress={() => toggleBookmark(courseId)}
      className="p-1 items-center justify-center flex-row"
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Text className={`text-xl ${isBookmarked ? "text-blue-600" : "text-gray-400"}`}>
        {isBookmarked ? '★' : '☆'}
      </Text>
    </TouchableOpacity>
  );
};