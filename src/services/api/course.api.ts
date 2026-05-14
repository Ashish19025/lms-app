import { apiClient } from './client';
import { Course, Instructor } from '../../types/course.types';

export const fetchCourses = async (page: number = 1, limit: number = 20) => {
  const response = await apiClient.get(`/api/v1/public/randomproducts?page=${page}&limit=${limit}`);
  return response.data.data.data as Course[];
};

export const fetchInstructors = async (page: number = 1, limit: number = 20) => {
  const response = await apiClient.get(`/api/v1/public/randomusers?page=${page}&limit=${limit}`);
  return response.data.data.data as Instructor[];
};