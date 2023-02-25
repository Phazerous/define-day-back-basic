import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Definition from './Definition';
import User from './User';

@Entity()
export default class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    length: 2,
    nullable: true,
  })
  lang: string;

  @Column({
    nullable: true,
  })
  description: string;

  @CreateDateColumn()
  createAt: Date;

  @Column()
  tag: string;

  @ManyToOne(() => User, (user) => user.words)
  user: User;

  @OneToMany(() => Definition, (definition) => definition.word)
  definitions: Definition[];
}
