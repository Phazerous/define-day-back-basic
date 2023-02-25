import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

import DefinitionDto from './DefinitionDto';
import DefinitionCreateDto from './DefinitionCreateDto';

export default class WordDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(2)
  lang: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsDateString()
  createdAt: string;

  @IsOptional()
  @IsString()
  tag: string;

  definitions: (DefinitionCreateDto | DefinitionDto)[];
}
