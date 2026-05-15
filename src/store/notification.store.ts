import { create } from 'zustand';
import { storeData, getData } from '../services/storage/asyncStorage';
import { NotificationItem } from '../components/notifications/NotificationCard';

const NOTIFICATIONS_KEY = '@app_notifications';

interface NotificationState {
  notifications: NotificationItem[];
  initializeNotifications: () => Promise<void>;
  addNotification: (notification: Omit<NotificationItem, 'id' | 'time' | 'read'>) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  clearAll: () => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],

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

  markAllAsRead: async () => {
    const newNotifications = get().notifications.map((n) => ({ ...n, read: true }));
    set({ notifications: newNotifications });
    
    try {
      await storeData(NOTIFICATIONS_KEY, newNotifications);
    } catch (e) {
      console.error('Failed to save notifications', e);
    }
  },

  clearAll: async () => {
    set({ notifications: [] });
    try {
      await storeData(NOTIFICATIONS_KEY, []);
    } catch (e) {
      console.error('Failed to clear notifications', e);
    }
  }
}));