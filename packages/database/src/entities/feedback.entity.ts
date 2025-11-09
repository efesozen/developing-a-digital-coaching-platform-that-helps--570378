import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { Session } from './session.entity';

@Entity({ name: 'feedback' })
export class Feedback extends BaseEntity {
  @Column({ type: 'integer' })
  rating!: number;

  @Column({ nullable: true })
  comments?: string;


@Column({ name: 'session_id' })
  sessionId!: string;

  @Index('idx_feedback_session_id')
  @ManyToOne('Session', 'feedbacks')
  @JoinColumn({ name: 'session_id' })
  session!: Session;
}
