import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { Coach } from './coach.entity';
import type { User } from './user.entity';

@Entity({ name: 'sessions' })
export class Session extends BaseEntity {
  @Column({ type: 'timestamp with time zone', name: 'scheduled_at' })
  @Index('idx_sessions_scheduled_at')
  scheduledAt!: Date;

  @Column({ type: 'enum', enum: ['scheduled', 'completed', 'canceled'] })
  status!: 'scheduled' | 'completed' | 'canceled';


@Column({ name: 'client_id' })
  clientId!: string;

  @Index('idx_sessions_client_id')
  @ManyToOne('User', 'sessions')
  @JoinColumn({ name: 'client_id' })
  user!: User;

  @Column({ name: 'coach_id' })
  coachId!: string;

  @Index('idx_sessions_coach_id')
  @ManyToOne('Coach', 'sessions')
  @JoinColumn({ name: 'coach_id' })
  coach!: Coach;
}
