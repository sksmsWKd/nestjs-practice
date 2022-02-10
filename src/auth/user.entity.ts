import { Board } from 'src/boards/board.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity() //해당 Decorator로 class가 엔티티임을
@Unique(['username'])
//db에서, username이 유니크값을 가지게 한다.
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(
    (type) => Board,
    (board) => board.user, //board에서 user를 접근하려면 어떻게해야하는지 명시
    { eager: true },
  )
  //user가져올때 boards 도 가져올것임)
  boards: Board[];
}
