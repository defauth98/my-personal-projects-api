import { Injectable } from '@nestjs/common';
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

    const data = await s3Instance.upload(params).promise();
    return data.Location;
  }

  async removeFile(fileName) {
    const s3Instance = AwsS3Manager.getInstance();

    const params = {
      Bucket: 'personal-projects-images',
      Key: fileName,
    };

    await s3Instance.deleteObject(params).promise();
  }
}
