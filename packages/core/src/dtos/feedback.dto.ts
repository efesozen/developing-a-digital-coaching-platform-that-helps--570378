import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateFeedbackDto {
  @IsUUID()
  sessionId!: string;

  @IsNumber()
  rating!: number;

  @IsOptional()
  @IsString()
  comments?: string;
}

export class UpdateFeedbackDto {
  @IsOptional()
  @IsUUID()
  sessionId?: string | undefined;

  @IsOptional()
  @IsNumber()
  rating?: number | undefined;

  @IsOptional()
  @IsOptional()
  @IsString()
  comments?: string | undefined;
}

export class FeedbackResponseDto {
  id!: string;
  sessionId!: string;
  rating!: number;
  comments?: string;
  createdAt!: Date;
  updatedAt!: Date;
}
