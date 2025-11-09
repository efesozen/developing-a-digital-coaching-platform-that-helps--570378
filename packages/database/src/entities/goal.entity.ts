import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { User } from './user.entity';

@Entity({ name: 'goals' })
export class Goal extends BaseEntity {
  @Column()
  description!: string;

  @Column({ type: 'integer', nullable: true })
  progress?: number;


@Column({ name: 'client_id' })
  clientId!: string;

  @Index('idx_goals_client_id')
  @ManyToOne('User', 'goals')
  @JoinColumn({ name: 'client_id' })
  user!: User;
}
