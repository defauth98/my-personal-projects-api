import { Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';

@ApiBearerAuth()
@ApiTags('Aws')
@Controller('aws')
export class AwsController {
  constructor(private awsS3Service: AwsS3Service) {}

  @Post()
  async uploadFile() {
    return this.awsS3Service.getSignedUploadURL();
  }
}
