import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Coach } from '@saas-template/database';
import type { CreateCoachDto, UpdateCoachDto } from '@saas-template/core';

@Injectable()
export class CoachsRepository extends Repository<Coach> {
  constructor(private dataSource: DataSource) {
    super(Coach, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Coach[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Coach | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateCoachDto): Promise<Coach> {
    const coach = this.create({
      ...dto,
      userId,
    });
    return this.save(coach);
  }

  async update(id: string, userId: string, dto: UpdateCoachDto): Promise<Coach | null> {
    const coach = await this.findById(id, userId);
    if (!coach) {
      return null;
    }

    Object.assign(coach, dto);
    return this.save(coach);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const coach = await this.findById(id, userId);
    if (!coach) {
      return false;
    }

    await this.softRemove(coach);
    return true;
  }
}
