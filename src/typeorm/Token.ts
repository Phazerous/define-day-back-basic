import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import User from './User';

@Entity()
export default class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  token: string;

  @ManyToOne(() => User, (user) => user.tokens)
  user: User;
}
