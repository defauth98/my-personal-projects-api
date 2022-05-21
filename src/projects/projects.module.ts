import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { AwsS3Module } from 'src/aws-s3/aws-s3.module';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [AwsS3Module, PrismaModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, AwsS3Service],
})
export class ProjectsModule {}
