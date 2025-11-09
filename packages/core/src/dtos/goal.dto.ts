import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateGoalDto {
  @IsUUID()
  clientId!: string;

  @IsString()
  @MinLength(1)
  description!: string;

  @IsOptional()
  @IsNumber()
  progress?: number;
}

export class UpdateGoalDto {
  @IsOptional()
  @IsUUID()
  clientId?: string | undefined;

  @IsOptional()
  @IsString()
  @MinLength(1)
  description?: string | undefined;

  @IsOptional()
  @IsOptional()
  @IsNumber()
  progress?: number | undefined;
}

export class GoalResponseDto {
  id!: string;
  clientId!: string;
  description!: string;
  progress?: number;
  createdAt!: Date;
  updatedAt!: Date;
}
