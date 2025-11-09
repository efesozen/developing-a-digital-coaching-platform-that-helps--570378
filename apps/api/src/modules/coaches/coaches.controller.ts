import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import type { CreateCoachDto, CoachResponseDto, UpdateCoachDto } from '@saas-template/core';
import type { User } from '@saas-template/database';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CoachsService } from './coaches.service';

@Controller('coaches')
@UseGuards(JwtAuthGuard)
export class CoachsController {
  constructor(private readonly coachsService: CoachsService) {}

  @Get()
  async findAll(@CurrentUser() user: User): Promise<CoachResponseDto[]> {
    return this.coachsService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: User): Promise<CoachResponseDto> {
    return this.coachsService.findOne(id, user.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateCoachDto,
    @CurrentUser() user: User
  ): Promise<CoachResponseDto> {
    return this.coachsService.create(user.id, dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCoachDto,
    @CurrentUser() user: User
  ): Promise<CoachResponseDto> {
    return this.coachsService.update(id, user.id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @CurrentUser() user: User): Promise<void> {
    return this.coachsService.remove(id, user.id);
  }
}
