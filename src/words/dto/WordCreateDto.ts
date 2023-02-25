import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import DefinitionCreateDto from './DefinitionCreateDto';

export default class WordCreateDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  lang?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  tag?: string;

  @ValidateNested({ each: true })
  @Type(() => DefinitionCreateDto)
  definitions: DefinitionCreateDto[];
}
