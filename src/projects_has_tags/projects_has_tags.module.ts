import { Module } from '@nestjs/common';
import { ProjectsHasTagsService } from './projects_has_tags.service';
import { ProjectsHasTagsController } from './projects_has_tags.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProjectsService } from 'src/projects/projects.service';
import { TagService } from 'src/tag/tag.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectsHasTagsController],
  providers: [ProjectsHasTagsService, ProjectsService, TagService],
})
export class ProjectsHasTagsModule {}
