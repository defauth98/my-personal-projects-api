import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsString } from 'class-validator';
import { Projects } from '../entities/project.entity';

export class CreateProjectDto implements Projects {
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

  @ApiProperty()
  @IsString()
  thumbnailPath: string;

  @ApiProperty()
  @IsString()
  gifPath: string;

  id?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  hidden?: boolean;
  ProjectHasTags?: Prisma.ProjectHasTagsUncheckedCreateNestedManyWithoutProjectInput;
}
