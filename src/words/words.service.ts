import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Definition from 'src/typeorm/Definition';
import User from 'src/typeorm/User';
import Word from 'src/typeorm/Word';
import { Repository } from 'typeorm';
import DefinitionCreateDto from './dto/DefinitionCreateDto';
import DefinitionDto from './dto/DefinitionDto';
import WordCreateDto from './dto/WordCreateDto';
import WordDto from './dto/WordDto';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(Word) private wordRepository: Repository<Word>,
    @InjectRepository(Definition)
    private definitionRepository: Repository<Definition>,
  ) {}

  async createWord(user: User, wordCreateDto: WordCreateDto) {
    const existingWord = await this.wordRepository.findOne({
      where: {
        title: wordCreateDto.title,
        user: {
          id: user.id,
        },
      },
    });

    if (existingWord)
      throw new BadRequestException('The specified word already exists.');

    const { definitions: definitionsToAssign, ...wordToSave } = wordCreateDto;

    const word = await this.wordRepository.save({
      ...wordToSave,
      user,
    });
    const definitions = await this.assignDefinitions(word, definitionsToAssign);

    return await this.getFullWordByID(word.id);
  }

  async updateWord(user: User, wordDto: WordDto) {
    const word = await this.wordRepository.findOne({
      where: {
        id: wordDto.id,
        user: {
          id: user.id,
        },
      },
    });

    if (!word)
      throw new ConflictException(`The specified user doesn't have the word.`);

    word.title = wordDto.title;
    word.lang = wordDto.lang;
    word.description = wordDto.description;
    word.tag = wordDto.tag;

    await this.wordRepository.save(word);
    await this.updateDefinitions(word, word.definitions, wordDto.definitions);

    return await this.getFullWordByID(word.id);
  }

  async updateDefinitions(
    word: Word,
    prevDefinitions: Definition[],
    definitionDtos: (DefinitionDto | DefinitionCreateDto)[],
  ) {
    const definitionsToSave = definitionDtos.map((definitionDto) =>
      'id' in definitionDto
        ? (definitionDto as unknown as Definition)
        : this.definitionRepository.create({
            ...(definitionDto as unknown as DefinitionCreateDto),
            word,
          }),
    );

    const savedDefinitions = await this.definitionRepository.save(
      definitionsToSave,
    );
    const savedDefinitionsIDs = savedDefinitions.map(
      (definition) => definition.id,
    );

    const definitionsToDelete = prevDefinitions.filter(
      (def) => savedDefinitionsIDs.indexOf(def.id) === -1,
    );

    await this.definitionRepository.remove(definitionsToDelete);
  }

  async getAllWords(user: User) {
    const words = await this.wordRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
      relations: {
        definitions: true,
      },
    });

    return words;
  }

  async getFullWordByID(id: number) {
    const word = await this.wordRepository.findOne({
      where: {
        id,
      },
      relations: {
        definitions: true,
      },
    });

    return word;
  }

  async assignDefinitions(
    word: Word,
    definitionCreateDtos: DefinitionCreateDto[],
  ) {
    const definitionsToSave = definitionCreateDtos.map((definitionCreateDto) =>
      this.definitionRepository.create({ ...definitionCreateDto, word }),
    );

    return await this.definitionRepository.save(definitionsToSave);
  }
}
