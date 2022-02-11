import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Unique(['email'])
@Entity()
export class MetaUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column()
  profile_image: string;

  @Column()
  social_id: string;

  @Column()
  social_type: string;

  @Column()
  self_introduce: string;
}
