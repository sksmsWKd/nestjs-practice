import { Addon } from 'src/addon/addon.entity';
import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardStatus } from './board-status.enum';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;

  @ManyToOne((type) => User, (user) => user.boards, {
    eager: false,
    cascade: ['update'],
  })
  user: User;

  @OneToMany((type) => Addon, (addon) => addon.board, { eager: false })
  addon: Addon;
}
