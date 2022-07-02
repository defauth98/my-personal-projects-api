import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Tag } from '../entities/tag.entity';

export class CreateTagDto extends Tag {
  @ApiProperty()
  @IsString()
  name: string;
}
