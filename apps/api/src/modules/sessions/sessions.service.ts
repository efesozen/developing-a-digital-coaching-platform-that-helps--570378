import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateSessionDto, SessionResponseDto, UpdateSessionDto } from '@saas-template/core';
import type { Session } from '@saas-template/database';
import { SessionsRepository } from './sessions.repository';

@Injectable()
export class SessionsService {
  constructor(
    private readonly sessionsRepository: SessionsRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<SessionResponseDto[]> {
    const sessions = await this.sessionsRepository.findAll(userId);
    return sessions.map((session: Session) => this.toResponseDto(session));
  }

  async findOne(id: string, userId: string): Promise<SessionResponseDto> {
    const session = await this.sessionsRepository.findById(id, userId);
    if (!session) {
      throw new NotFoundException('Session not found');
    }
    return this.toResponseDto(session);
  }

  async create(userId: string, dto: CreateSessionDto): Promise<SessionResponseDto> {
    return this.uow.execute(async () => {
      const session = await this.sessionsRepository.create(userId, dto);
      return this.toResponseDto(session);
    });
  }

  async update(id: string, userId: string, dto: UpdateSessionDto): Promise<SessionResponseDto> {
    return this.uow.execute(async () => {
      const session = await this.sessionsRepository.update(id, userId, dto);
      if (!session) {
        throw new NotFoundException('Session not found');
      }
      return this.toResponseDto(session);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.sessionsRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Session not found');
      }
    });
  }

  private toResponseDto(session: Session): SessionResponseDto {
    return {
      id: session.id,
      clientId: session.clientId,
      coachId: session.coachId,
      scheduledAt: session.scheduledAt,
      status: session.status,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
    };
  }
}
