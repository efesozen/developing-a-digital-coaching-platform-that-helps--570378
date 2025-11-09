import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Session } from '@saas-template/database';
import type { CreateSessionDto, UpdateSessionDto } from '@saas-template/core';

@Injectable()
export class SessionsRepository extends Repository<Session> {
  constructor(private dataSource: DataSource) {
    super(Session, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Session[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Session | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateSessionDto): Promise<Session> {
    const session = this.create({
      ...dto,
      userId,
    });
    return this.save(session);
  }

  async update(id: string, userId: string, dto: UpdateSessionDto): Promise<Session | null> {
    const session = await this.findById(id, userId);
    if (!session) {
      return null;
    }

    Object.assign(session, dto);
    return this.save(session);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const session = await this.findById(id, userId);
    if (!session) {
      return false;
    }

    await this.softRemove(session);
    return true;
  }
}
