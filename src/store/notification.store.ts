import { create } from 'zustand';
import { storeData, getData } from '../services/storage/asyncStorage';
import { NotificationItem } from '../components/notifications/NotificationCard';

// Key used to store notifications in async storage, ensuring that the notification data is persisted across app sessions and can be retrieved when the user returns to the app
const NOTIFICATIONS_KEY = '@app_notifications';

/**
 * NotificationState - Defines the shape of the notification state and actions for managing user notifications, 
 * including initializing notifications from storage, 
 * adding new notifications, marking notifications as read, and clearing all notifications.
 */
interface NotificationState {
  notifications: NotificationItem[];
  initializeNotifications: () => Promise<void>;
  addNotification: (notification: Omit<NotificationItem, 'id' | 'time' | 'read'>) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  clearAll: () => Promise<void>;
}

/** useNotificationStore - A Zustand store for managing user notifications,
 *  providing actions to initialize, add, mark as read, and clear notifications, 
 * with persistence using async storage to ensure that notification data is retained across app sessions. 
 **/
export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],

  /** Function to initialize notifications from async storage, allowing the app to load any previously stored notifications when it starts up, 
   * ensuring that users can see their past notifications even after closing and reopening the app. 
   **/  
  initializeNotifications: async () => {
    try {
      const data = await getData(NOTIFICATIONS_KEY);
      if (data && Array.isArray(data)) {
        set({ notifications: data });
      }
    } catch (e) {
      console.error('Failed to load notifications', e);
    }
  },

  /** Function to add a new notification, which creates a new notification item with a unique ID, timestamp, and read status,
   *  adds it to the existing notifications in the store, and persists the updated notifications list to async storage to ensure that the new notification is retained across app sessions. 
   **/
  addNotification: async (notification) => {
    const newNotification: NotificationItem = {
      ...notification,
      id: Date.now().toString(),
      time: new Date().toISOString(), // Use ISO string to track time
      read: false,
    };
    
    const newNotifications = [newNotification, ...get().notifications];
    set({ notifications: newNotifications });
    
    try {
      await storeData(NOTIFICATIONS_KEY, newNotifications);
    } catch (e) {
      console.error('Failed to save notifications', e);
    }
  },

  /** Function to mark a specific notification as read, 
   * which updates the read status of the notification with the given ID in the store and
   * persists the updated notifications list to async storage to ensure that the read status is retained across app sessions.
   **/
  markAsRead: async (id: string) => {
    const newNotifications = get().notifications.map((n) => 
      n.id === id ? { ...n, read: true } : n
    );
    
    set({ notifications: newNotifications });
    
    try {
      await storeData(NOTIFICATIONS_KEY, newNotifications);
    } catch (e) {
      console.error('Failed to save notifications', e);
    }
  },

  /** Function to mark all notifications as read, 
   * which updates the read status of all notifications in the store to true and 
   * persists the updated notifications list to async storage to ensure that the read status of all notifications is retained across app sessions. 
   **/
  markAllAsRead: async () => {
    const newNotifications = get().notifications.map((n) => ({ ...n, read: true }));
    set({ notifications: newNotifications });
    
    try {
      await storeData(NOTIFICATIONS_KEY, newNotifications);
    } catch (e) {
      console.error('Failed to save notifications', e);
    }
  },

  /** Function to clear all notifications, which removes all notifications from the store and 
   * persists the empty notifications list to async storage to ensure that all notifications are cleared across app sessions. 
   **/
  clearAll: async () => {
    set({ notifications: [] });
    try {
      await storeData(NOTIFICATIONS_KEY, []);
    } catch (e) {
      console.error('Failed to clear notifications', e);
    }
  }
}));