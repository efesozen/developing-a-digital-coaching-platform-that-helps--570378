import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateCoachDto, CoachResponseDto, UpdateCoachDto } from '@saas-template/core';
import type { Coach } from '@saas-template/database';
import { CoachsRepository } from './coaches.repository';

@Injectable()
export class CoachsService {
  constructor(
    private readonly coachsRepository: CoachsRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<CoachResponseDto[]> {
    const coaches = await this.coachsRepository.findAll(userId);
    return coaches.map((coach: Coach) => this.toResponseDto(coach));
  }

  async findOne(id: string, userId: string): Promise<CoachResponseDto> {
    const coach = await this.coachsRepository.findById(id, userId);
    if (!coach) {
      throw new NotFoundException('Coach not found');
    }
    return this.toResponseDto(coach);
  }

  async create(userId: string, dto: CreateCoachDto): Promise<CoachResponseDto> {
    return this.uow.execute(async () => {
      const coach = await this.coachsRepository.create(userId, dto);
      return this.toResponseDto(coach);
    });
  }

  async update(id: string, userId: string, dto: UpdateCoachDto): Promise<CoachResponseDto> {
    return this.uow.execute(async () => {
      const coach = await this.coachsRepository.update(id, userId, dto);
      if (!coach) {
        throw new NotFoundException('Coach not found');
      }
      return this.toResponseDto(coach);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.coachsRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Coach not found');
      }
    });
  }

  private toResponseDto(coach: Coach): CoachResponseDto {
    return {
      id: coach.id,
      certification: coach.certification,
      bio: coach.bio,
      createdAt: coach.createdAt,
      updatedAt: coach.updatedAt,
    };
  }
}
