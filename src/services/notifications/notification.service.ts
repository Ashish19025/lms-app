import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure how notifications behave when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const requestNotificationPermissions = async () => {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === 'granted';
};

export const scheduleBookmarkMilestoneNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Wow! 🌟",
      body: "You've bookmarked 5 courses! Time to start learning them?",
      data: { type: 'milestone' },
    },
    trigger: null, // trigger immediately
  });
};

export const scheduleInactivityReminder = async () => {
  // Cancel previous reminders so we don't spam if user is active
  await Notifications.cancelAllScheduledNotificationsAsync();

  // Schedule a new one for 24 hours from now
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "We miss you!",
      body: "It's been 24 hours. Jump back in and continue your learning journey! 🚀",
      data: { type: 'inactivity' },
    },
    trigger: {
      type: 'timeInterval',
      seconds: 60 * 60 * 24, // 24 hours
      repeats: false,
    },
  });
};