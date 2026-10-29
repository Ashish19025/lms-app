jest.mock('../services/storage/asyncStorage', () => ({
  storeData: jest.fn(() => Promise.resolve()),
  getData: jest.fn(() => Promise.resolve(null)),
}));

import { useNotificationStore } from '../store/notification.store';

describe('Notification Store', () => {
  beforeEach(() => useNotificationStore.setState({ notifications: [] }));

  test('addNotification adds an unread item first', async () => {
    await useNotificationStore.getState().addNotification({ title: 'A', message: 'a', type: 'system' });
    const [n] = useNotificationStore.getState().notifications;
    expect(n.title).toBe('A');
    expect(n.read).toBe(false);
  });

  test('markAllAsRead and clearAll', async () => {
    await useNotificationStore.getState().addNotification({ title: 'A', message: 'a', type: 'system' });
    await useNotificationStore.getState().markAllAsRead();
    expect(useNotificationStore.getState().notifications.every((n) => n.read)).toBe(true);
    await useNotificationStore.getState().clearAll();
    expect(useNotificationStore.getState().notifications).toEqual([]);
  });
});
