import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { User } from './user.entity';

@Entity({ name: 'coaches' })
export class Coach extends BaseEntity {
  @Column()
  certification!: string;

  @Column({ nullable: true })
  bio?: string;

}
