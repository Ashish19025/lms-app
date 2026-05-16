import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure how notifications behave when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const requestNotificationPermissions = async (): Promise<boolean> => {
  try {
    // On Android, we need to set up a notification channel for the app to receive notifications properly
    if (Platform.OS === 'android') {
      // Create a default notification channel with high importance to ensure notifications are delivered and displayed correctly on Android devices
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    // Check existing notification permissions and request them if not already granted. This ensures that the app has the necessary permissions to send notifications to the user.
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    // If permissions are not already granted, request them from the user
    let finalStatus = existingStatus;
    
    // If the existing status is not granted, prompt the user to grant notification permissions and update the final status based on their response
    if (existingStatus !== 'granted') {
      // Request permissions from the user and update the final status based on their response
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    // Return true if permissions are granted, allowing the app to send notifications, or false if permissions are denied
    return finalStatus === 'granted';
  } catch (error) {
    console.error('Error requesting notification permissions:', error);
    return false;
  }
};

// Function to schedule a notification when a user reaches a bookmarking milestone, providing immediate feedback and encouraging further engagement with the app
export const scheduleBookmarkMilestoneNotification = async (): Promise<void> => {
  try {
    // Schedule a notification to congratulate the user on reaching a bookmarking milestone, such as bookmarking 5 courses, to encourage them to start learning those courses
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🎉 Milestone Reached!",
        body: "You've bookmarked 5 courses! Time to start learning them?",
        data: { type: 'milestone' },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 1, // Show immediately
      },
    });
  } catch (error) {
    console.error('Error scheduling bookmark milestone notification:', error);
  }
};

// Function to schedule a notification when a user bookmarks a course, providing immediate feedback and encouraging engagement with the app
export const BookmarkNotification = async (courseTitle: string): Promise<void> => {
  try {
    // Schedule a notification to congratulate the user on bookmarking a course, providing immediate feedback and encouraging them to start learning the course they just bookmarked
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Course Bookmarked",
        body: `You bookmarked ${courseTitle}.`,
        data: { type: 'bookmark' },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 1, // Show immediately
      },
    });
  } catch (error) {
    console.error('Error scheduling bookmark notification:', error);
  }
};

export const scheduleInactivityReminder = async (): Promise<void> => {
  try {
    // Cancel previous reminders so we don't spam if user is active
    await Notifications.cancelAllScheduledNotificationsAsync();

    // Schedule a new one for 24 hours from now
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "👋 Welcome Back!",
        body: "It's been 24 hours. Jump back in and continue your learning journey! 🚀",
        data: { type: 'inactivity' },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 60 * 60 * 24, // 24 hours in seconds
      },
    });
  } catch (error) {
    console.error('Error scheduling inactivity reminder:', error);
  }
};