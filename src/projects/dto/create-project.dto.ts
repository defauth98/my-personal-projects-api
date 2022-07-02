import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Projects } from '../entities/project.entity';

export class CreateProjectDto extends Projects {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  link: string;

  @ApiProperty()
  @IsString()
  repoLink: string;

  @ApiProperty()
  @IsString()
  faviconLink: string;
}
