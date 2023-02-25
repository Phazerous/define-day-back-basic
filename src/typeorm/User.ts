import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import Token from './Token';
import Word from './Word';

@Entity('user')
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  create_at: Date;

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];

  @OneToMany(() => Word, (word) => word.user)
  words: Word[];
}
