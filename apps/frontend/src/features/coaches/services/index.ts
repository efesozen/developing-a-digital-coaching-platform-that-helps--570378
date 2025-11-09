import { api } from '@/lib/api';
import type { CoachResponseDto, CreateCoachDto, UpdateCoachDto } from '@saas-template/core';

export const coachesService = {
  async getAll(): Promise<CoachResponseDto[]> {
    const response = await api.get('/coaches');
    return response.data;
  },

  async getById(id: string): Promise<CoachResponseDto> {
    const response = await api.get(`/coaches/${id}`);
    return response.data;
  },

  async create(data: CreateCoachDto): Promise<CoachResponseDto> {
    const response = await api.post('/coaches', data);
    return response.data;
  },

  async update(id: string, data: UpdateCoachDto): Promise<CoachResponseDto> {
    const response = await api.put(`/coaches/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/coaches/${id}`);
  },
};
