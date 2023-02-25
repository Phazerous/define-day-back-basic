import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export default class DefinitionDto {
  @IsNumber()
  id: number;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  partOfSpeech: string;

  @IsDateString()
  createAt: string;
}
