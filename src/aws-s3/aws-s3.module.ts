import { Module } from '@nestjs/common';
import { AwsS3Service } from './aws-s3.service';
import { AwsController } from './aws.controller';

@Module({
  controllers: [AwsController],
  providers: [AwsS3Service],
  exports: [AwsS3Service],
})
export class AwsS3Module {}
