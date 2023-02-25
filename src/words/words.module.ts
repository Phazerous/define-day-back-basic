import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Word from 'src/typeorm/Word';
import Definition from 'src/typeorm/Definition';
import User from 'src/typeorm/User';

@Module({
  imports: [TypeOrmModule.forFeature([Word, Definition, User])],
  providers: [WordsService],
  controllers: [WordsController],
})
export class WordsModule {}
