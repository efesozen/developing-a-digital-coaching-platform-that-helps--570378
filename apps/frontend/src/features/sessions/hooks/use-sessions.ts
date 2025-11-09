import type { CreateSessionDto, UpdateSessionDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { sessionsService } from '../services';

const SESSION_KEY = ['sessions'];

export function useSessions() {
  return useQuery({
    queryKey: SESSION_KEY,
    queryFn: () => sessionsService.getAll(),
  });
}

export function useSession(id: string) {
  return useQuery({
    queryKey: [...SESSION_KEY, id],
    queryFn: () => sessionsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSessionDto) => sessionsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SESSION_KEY });
    },
  });
}

export function useUpdateSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSessionDto }) =>
      sessionsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SESSION_KEY });
    },
  });
}

export function useDeleteSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => sessionsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SESSION_KEY });
    },
  });
}
