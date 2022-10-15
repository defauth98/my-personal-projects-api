import { Module } from '@nestjs/common';
import { AwsS3Module } from '../aws-s3/aws-s3.module';
import { AwsS3Service } from '../aws-s3/aws-s3.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  imports: [AwsS3Module, PrismaModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, AwsS3Service],
})
export class ProjectsModule {}
