import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateCoachDto {
  @IsUUID()
  userId!: string;

  @IsString()
  @MinLength(1)
  certification!: string;

  @IsOptional()
  @IsString()
  bio?: string;
}

export class UpdateCoachDto {
  @IsOptional()
  @IsUUID()
  userId?: string | undefined;

  @IsOptional()
  @IsString()
  @MinLength(1)
  certification?: string | undefined;

  @IsOptional()
  @IsOptional()
  @IsString()
  bio?: string | undefined;
}

export class CoachResponseDto {
  id!: string;
  userId!: string;
  certification!: string;
  bio?: string;
  createdAt!: Date;
  updatedAt!: Date;
}
