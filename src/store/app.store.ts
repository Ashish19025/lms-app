import { create } from 'zustand';
import { storeData, getData } from '../services/storage/asyncStorage';
import { scheduleBookmarkMilestoneNotification , BookmarkNotification} from '../services/notifications/notification.service';
import { useNotificationStore } from './notification.store';
import { useCourseStore } from './course.store';

const BOOKMARKS_KEY = '@bookmarked_courses';

interface AppState {
  bookmarkedIds: number[];
  initializeBookmarks: () => Promise<void>;
  toggleBookmark: (id: number) => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  bookmarkedIds: [],
  
  initializeBookmarks: async () => {
    try {
      const data = await getData(BOOKMARKS_KEY);
      if (data && Array.isArray(data)) {
        set({ bookmarkedIds: data });
      }
    } catch (e) {
      console.error('Failed to load bookmarks', e);
    }
  },

  toggleBookmark: async (id: number) => {
    const currentBookmarks = get().bookmarkedIds;
    const isBookmarked = currentBookmarks.includes(id);
    let newBookmarks;
    
    if (isBookmarked) {
      newBookmarks = currentBookmarks.filter((bookmarkId) => bookmarkId !== id);
    } else {
      newBookmarks = [...currentBookmarks, id];
      
      const course = useCourseStore.getState().courses.find(c => c.id === id);
      const courseTitle = course ? course.title : 'this course';
      
      useNotificationStore.getState().addNotification({
        title: 'Course Bookmarked',
        message: `You bookmarked ${courseTitle}.`,
        type: 'bookmark'
      });

      // Trigger milestone notification when exactly 5 courses are bookmarked
      if (newBookmarks.length === 5) {
        scheduleBookmarkMilestoneNotification();
        useNotificationStore.getState().addNotification({
          title: 'Milestone Reached! ',
          message: `You've bookmarked 5 courses! Time to start learning them?`,
          type: 'system'
        });
      }
    }

    if (!isBookmarked) {
      const course = useCourseStore.getState().courses.find(c => c.id === id);
      const courseTitle = course ? course.title : 'this course';
      await BookmarkNotification(courseTitle);
    }
    
    set({ bookmarkedIds: newBookmarks });
    
    try {
      await storeData(BOOKMARKS_KEY, newBookmarks);
    } catch (e) {
      console.error('Failed to save bookmarks', e);
    }
  }
}));