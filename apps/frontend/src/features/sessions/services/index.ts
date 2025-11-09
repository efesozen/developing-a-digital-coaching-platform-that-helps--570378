import { api } from '@/lib/api';
import type { SessionResponseDto, CreateSessionDto, UpdateSessionDto } from '@saas-template/core';

export const sessionsService = {
  async getAll(): Promise<SessionResponseDto[]> {
    const response = await api.get('/sessions');
    return response.data;
  },

  async getById(id: string): Promise<SessionResponseDto> {
    const response = await api.get(`/sessions/${id}`);
    return response.data;
  },

  async create(data: CreateSessionDto): Promise<SessionResponseDto> {
    const response = await api.post('/sessions', data);
    return response.data;
  },

  async update(id: string, data: UpdateSessionDto): Promise<SessionResponseDto> {
    const response = await api.put(`/sessions/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/sessions/${id}`);
  },
};
