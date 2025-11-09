import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coach } from '@saas-template/database';
import { DatabaseModule } from '@/core/database/database.module';
import { CoachsController } from './coaches.controller';
import { CoachsService } from './coaches.service';
import { CoachsRepository } from './coaches.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Coach]),
    DatabaseModule,
  ],
  controllers: [CoachsController],
  providers: [CoachsService, CoachsRepository],
  exports: [CoachsService],
})
export class CoachsModule {}
