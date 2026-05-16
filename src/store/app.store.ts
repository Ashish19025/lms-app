import { create } from 'zustand';
import { storeData, getData } from '../services/storage/asyncStorage';
import { scheduleBookmarkMilestoneNotification , BookmarkNotification} from '../services/notifications/notification.service';
import { useNotificationStore } from './notification.store';
import { useCourseStore } from './course.store';


// Key used to store the list of bookmarked course IDs in async storage, allowing the app to persist the user's bookmarked courses across sessions and provide a personalized experience when they return to the app
const BOOKMARKS_KEY = '@bookmarked_courses';

/**
 * AppState - Manages global application state related to bookmarked courses, including initialization and toggling of bookmarks.
 */
interface AppState {
  bookmarkedIds: number[];
  initializeBookmarks: () => Promise<void>;
  toggleBookmark: (id: number) => Promise<void>;
}

/**
 * useAppStore - A Zustand store that manages the state of bookmarked courses, allowing users to bookmark and unbookmark courses while persisting this information across app sessions using async storage.
 */
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