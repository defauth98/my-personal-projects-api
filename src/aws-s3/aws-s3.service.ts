import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import AwsS3Manager from './AwsS3Manager';

@Injectable()
export class AwsS3Service {
  async listFiles() {
    const s3Instance = AwsS3Manager.getInstance();

    const params = {
      Bucket: 'personal-projects-images',
    };

    const result = await s3Instance.listObjectsV2(params).promise();

    return result.Contents.map((item) => item.Key);
  }

  async uploadFile(fileContent, fileName) {
    const s3Instance = AwsS3Manager.getInstance();

    const params = {
      Bucket: 'personal-projects-images',
      Key: fileName,
      Body: fileContent,
    };

    return s3Instance.upload(params).promise();
  }

  async getSignedUploadURL(
    filePrefix: string,
    fileExtension: string,
    contentType: string,
  ) {
    const s3Instance = AwsS3Manager.getInstance();
    const actionId = uuid();
    const expires = 30 * 60; // 30 minutes in seconds

    const s3Params = {
      Bucket: 'personal-projects-images',
      Key: `${filePrefix}-${actionId}${fileExtension}`,
      ContentType: contentType,
      Expires: expires,
    };

    return new Promise((resolve, reject) => {
      resolve({
        url: s3Instance.getSignedUrl('putObject', s3Params),
        fileName: `${filePrefix}-${actionId}${fileExtension}`,
      });
    });
  }

  async removeFile(fileName) {
    const s3Instance = AwsS3Manager.getInstance();

    const params = {
      Bucket: process.env.MY_AWS_S3_BUCKET,
      Key: fileName,
    };

    await s3Instance.deleteObject(params).promise();
  }
}
