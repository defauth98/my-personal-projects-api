import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { ProjectsHasTag } from '../entities/projects_has_tag.entity';

export class CreateProjectsHasTagDto extends ProjectsHasTag {
  @ApiProperty()
  @IsNumber()
  tag_id: number;
}
