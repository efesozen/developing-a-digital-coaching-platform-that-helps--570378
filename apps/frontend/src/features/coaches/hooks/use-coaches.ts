import type { CreateCoachDto, UpdateCoachDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { coachesService } from '../services';

const COACH_KEY = ['coaches'];

export function useCoaches() {
  return useQuery({
    queryKey: COACH_KEY,
    queryFn: () => coachesService.getAll(),
  });
}

export function useCoach(id: string) {
  return useQuery({
    queryKey: [...COACH_KEY, id],
    queryFn: () => coachesService.getById(id),
    enabled: !!id,
  });
}

export function useCreateCoach() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCoachDto) => coachesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COACH_KEY });
    },
  });
}

export function useUpdateCoach() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCoachDto }) =>
      coachesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COACH_KEY });
    },
  });
}

export function useDeleteCoach() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => coachesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COACH_KEY });
    },
  });
}
