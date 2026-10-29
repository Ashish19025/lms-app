import { Course } from '../types/course.types';

export interface Lesson {
  index: number;
  title: string;
  minutes: number;
}

const LESSON_TEMPLATES = [
  'Introduction to {t}',
  'Core concepts of {t}',
  'Hands-on with {t}',
  'Advanced {t} techniques',
  '{t}: final project',
];

export const LESSONS_PER_COURSE = LESSON_TEMPLATES.length;

// The API has no lesson data, so each course gets a fixed, predictable lesson plan
export const getLessons = (course: Pick<Course, 'id' | 'title'>): Lesson[] =>
  LESSON_TEMPLATES.map((template, index) => ({
    index,
    title: template.replace('{t}', course.title),
    minutes: 5 + ((course.id * 7 + index * 3) % 15),
  }));
