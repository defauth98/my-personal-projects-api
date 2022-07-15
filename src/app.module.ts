import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { AwsS3Module } from './aws-s3/aws-s3.module';
import { TagModule } from './tag/tag.module';
import { ProjectsHasTagsModule } from './projects_has_tags/projects_has_tags.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ProjectsModule,
    AwsS3Module,
    TagModule,
    ProjectsHasTagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
