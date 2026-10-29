jest.mock('../services/storage/asyncStorage', () => ({
  storeData: jest.fn(() => Promise.resolve()),
  getData: jest.fn(() => Promise.resolve([3, 4])),
}));
jest.mock('../services/notifications/notification.service', () => ({
  scheduleBookmarkMilestoneNotification: jest.fn(),
  BookmarkNotification: jest.fn(() => Promise.resolve()),
}));
jest.mock('../services/api/course.api', () => ({ fetchCourses: jest.fn(), fetchCourseById: jest.fn() }));

import { useBookmarkStore } from '../store/bookmark.store';
import { useNotificationStore } from '../store/notification.store';

describe('Bookmark Store', () => {
  beforeEach(() => {
    useBookmarkStore.setState({ bookmarkedIds: [] });
    useNotificationStore.setState({ notifications: [] });
  });

  test('toggleBookmark adds then removes', async () => {
    await useBookmarkStore.getState().toggleBookmark(1);
    expect(useBookmarkStore.getState().bookmarkedIds).toEqual([1]);
    await useBookmarkStore.getState().toggleBookmark(1);
    expect(useBookmarkStore.getState().bookmarkedIds).toEqual([]);
  });

  test('bookmarking adds an in-app notification', async () => {
    await useBookmarkStore.getState().toggleBookmark(5);
    expect(useNotificationStore.getState().notifications[0].type).toBe('bookmark');
  });

  test('initializeBookmarks loads saved ids', async () => {
    await useBookmarkStore.getState().initializeBookmarks();
    expect(useBookmarkStore.getState().bookmarkedIds).toEqual([3, 4]);
  });
});
