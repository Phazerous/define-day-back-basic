import { IsOptional, IsString } from 'class-validator';

export default class DefinitionCreateDto {
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  partOfSpeech: string;
}
