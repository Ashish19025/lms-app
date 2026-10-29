import { create } from 'zustand';
import { storeData, getData } from '../services/storage/asyncStorage';
import { LESSONS_PER_COURSE } from '../utils/lessons';

const PROGRESS_KEY = '@course_progress';

interface ProgressData {
  // Course IDs the user enrolled in, most recent first
  enrolledIds: number[];
  // Completed lesson indexes per course
  completed: Record<number, number[]>;
}

interface ProgressState extends ProgressData {
  initializeProgress: () => Promise<void>;
  enroll: (courseId: number) => Promise<void>;
  completeLesson: (courseId: number, lessonIndex: number) => Promise<void>;
  isEnrolled: (courseId: number) => boolean;
  // 0..1 share of lessons done
  getProgress: (courseId: number) => number;
  // First lesson not yet done (or the last one if all are done)
  getNextLesson: (courseId: number) => number;
  resetProgress: () => Promise<void>;
}

/**
 * useProgressStore - Tracks enrolments and completed lessons, saved on the device.
 */
export const useProgressStore = create<ProgressState>((set, get) => {
  const persist = () => {
    const { enrolledIds, completed } = get();
    return storeData(PROGRESS_KEY, { enrolledIds, completed });
  };

  return {
    enrolledIds: [],
    completed: {},

    initializeProgress: async () => {
      const data: ProgressData | null = await getData(PROGRESS_KEY);
      if (data) set({ enrolledIds: data.enrolledIds || [], completed: data.completed || {} });
    },

    enroll: async (courseId) => {
      if (get().enrolledIds.includes(courseId)) return;
      set({ enrolledIds: [courseId, ...get().enrolledIds] });
      await persist();
    },

    completeLesson: async (courseId, lessonIndex) => {
      const done = get().completed[courseId] || [];
      if (done.includes(lessonIndex)) return;
      set({
        enrolledIds: get().enrolledIds.includes(courseId) ? get().enrolledIds : [courseId, ...get().enrolledIds],
        completed: { ...get().completed, [courseId]: [...done, lessonIndex] },
      });
      await persist();
    },

    isEnrolled: (courseId) => get().enrolledIds.includes(courseId),

    getProgress: (courseId) => (get().completed[courseId]?.length || 0) / LESSONS_PER_COURSE,

    getNextLesson: (courseId) => {
      const done = get().completed[courseId] || [];
      for (let i = 0; i < LESSONS_PER_COURSE; i++) if (!done.includes(i)) return i;
      return LESSONS_PER_COURSE - 1;
    },

    resetProgress: async () => {
      set({ enrolledIds: [], completed: {} });
      await persist();
    },
  };
});
