import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ProjectsService } from '../projects/projects.service';
import { TagService } from '../tag/tag.service';
import { ProjectsHasTagsController } from './projects_has_tags.controller';
import { ProjectsHasTagsService } from './projects_has_tags.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectsHasTagsController],
  providers: [ProjectsHasTagsService, ProjectsService, TagService],
})
export class ProjectsHasTagsModule {}
