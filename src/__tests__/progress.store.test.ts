jest.mock('../services/storage/asyncStorage', () => ({
  storeData: jest.fn(() => Promise.resolve()),
  getData: jest.fn(() => Promise.resolve({ enrolledIds: [7], completed: { 7: [0] } })),
}));

import { useProgressStore } from '../store/progress.store';
import { LESSONS_PER_COURSE } from '../utils/lessons';

describe('Progress Store', () => {
  beforeEach(() => useProgressStore.setState({ enrolledIds: [], completed: {} }));

  test('enroll adds a course once', async () => {
    await useProgressStore.getState().enroll(1);
    await useProgressStore.getState().enroll(1);
    expect(useProgressStore.getState().enrolledIds).toEqual([1]);
  });

  test('completeLesson auto-enrolls and tracks progress', async () => {
    const s = useProgressStore.getState();
    await s.completeLesson(2, 0);
    await s.completeLesson(2, 0);
    expect(useProgressStore.getState().isEnrolled(2)).toBe(true);
    expect(useProgressStore.getState().getProgress(2)).toBeCloseTo(1 / LESSONS_PER_COURSE);
    expect(useProgressStore.getState().getNextLesson(2)).toBe(1);
  });

  test('initializeProgress restores saved data', async () => {
    await useProgressStore.getState().initializeProgress();
    expect(useProgressStore.getState().enrolledIds).toEqual([7]);
    expect(useProgressStore.getState().getNextLesson(7)).toBe(1);
  });
});
