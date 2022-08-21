import { Controller, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';

class AWSUploadDTO {
  @ApiProperty()
  filetype: string;

  @ApiProperty()
  filePrefix: string;
}

@ApiBearerAuth()
@ApiTags('Aws')
@Controller('uploadFile')
export class AwsController {
  constructor(private awsS3Service: AwsS3Service) {}

  @Post()
  async uploadFile(@Query('') params: AWSUploadDTO) {
    const filetypeDictionary = {
      jpg: {
        fileExtension: '.jpg',
        contentType: 'image/jpg',
      },
      png: {
        fileExtension: '.png',
        contentType: 'image/png',
      },
      gif: {
        fileExtension: '.gif',
        contentType: 'image/gif',
      },
    };

    const fileConfig = filetypeDictionary[params.filetype];

    return this.awsS3Service.getSignedUploadURL(
      params.filePrefix,
      fileConfig.fileExtension,
      fileConfig.contentType,
    );
  }
}
