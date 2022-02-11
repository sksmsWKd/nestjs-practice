import { Board } from 'src/boards/board.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Addon extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne((type) => Board, (board) => board.addon, { eager: false })
  board: Board;
}
