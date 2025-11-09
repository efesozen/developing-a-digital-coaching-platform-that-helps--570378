import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export enum SessionStatus {
  SCHEDULED = 'scheduled',
  COMPLETED = 'completed',
  CANCELED = 'canceled'
}

export class CreateSessionDto {
  @IsUUID()
  clientId!: string;

  @IsUUID()
  coachId!: string;

  @IsDate()
  scheduledAt!: Date;

  @IsEnum(SessionStatus)
  status!: SessionStatus;
}

export class UpdateSessionDto {
  @IsOptional()
  @IsUUID()
  clientId?: string | undefined;

  @IsOptional()
  @IsUUID()
  coachId?: string | undefined;

  @IsOptional()
  @IsDate()
  scheduledAt?: Date | undefined;

  @IsOptional()
  @IsEnum(SessionStatus)
  status?: SessionStatus | undefined;
}

export class SessionResponseDto {
  id!: string;
  clientId!: string;
  coachId!: string;
  scheduledAt!: Date;
  status!: SessionStatus;
  createdAt!: Date;
  updatedAt!: Date;
}
