import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import CookieAuthGuard from 'src/auth/strategy/cookie-auth.guard';
import WordCreateDto from './dto/WordCreateDto';
import { WordsService } from './words.service';

@Controller('words')
export class WordsController {
  constructor(private wordService: WordsService) {}

  @Post()
  @UseGuards(CookieAuthGuard)
  @UsePipes(ValidationPipe)
  async createWord(@Request() req, @Body() wordCreateDto: WordCreateDto) {
    const word = await this.wordService.createWord(req.user, wordCreateDto);

    return word;
  }

  @Get()
  @UseGuards(CookieAuthGuard)
  async getAllWords(@Request() req) {
    const words = await this.wordService.getAllWords(req.user);

    console.log(words);

    return words;
  }
}
