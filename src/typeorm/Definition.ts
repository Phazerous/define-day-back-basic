import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Word from './Word';

@Entity()
export default class Definition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({
    nullable: true,
  })
  partOfSpeech: string;

  @Column({
    nullable: true,
  })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Word, (word) => word.definitions)
  word: Word;
}
