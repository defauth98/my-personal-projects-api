import { Controller, Get, HttpException, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';

class AWSUploadDTO {
  @ApiProperty()
  filetype: string;

  @ApiProperty()
  projectName: string;
}

@ApiBearerAuth()
@ApiTags('Aws')
@Controller('')
export class AwsController {
  constructor(private awsS3Service: AwsS3Service) {}

  @Post('uploadFile')
  async uploadProjectFile(@Query() params: AWSUploadDTO) {
    const filetypeDictionary = {
      png: {
        fileExtension: '.png',
      },
      gif: {
        fileExtension: '.gif',
      },
    };

    const fileConfig = filetypeDictionary[params.filetype];

    if (fileConfig == null) {
      return new HttpException('File extension not found', 400);
    }

    return this.awsS3Service.getSignedUploadURL(
      params.projectName,
      fileConfig.fileExtension,
    );
  }

  @Get('/listS3Files')
  async list() {
    return this.awsS3Service.listFiles();
  }
}
