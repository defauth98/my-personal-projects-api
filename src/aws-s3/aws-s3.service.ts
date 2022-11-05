import { Injectable } from '@nestjs/common';

import {
  DeleteObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class AwsS3Service {
  s3Client: S3Client = null;

  getS3() {
    if (!this.s3Client) {
      this.s3Client = new S3Client({
        credentials: {
          accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
          secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
        },
        region: String(process.env.AWS_REGION),
      });
    }

    return this.s3Client;
  }

  async getSignedUploadURL(projectName: string, fileExtension: string) {
    const client = this.getS3();

    const key = `${projectName}-${uuidV4()}${fileExtension}`

    const url = await getSignedUrl(
      client,
      new PutObjectCommand({
        Key: key,
        Bucket: 'personal-projects-images',
      }),
      { expiresIn: 300 },
    );

    return { url, filePath: key };
  }

  async removeFile(fileName: string) {
    const params = {
       Bucket: 'personal-projects-images',
      Key: fileName,
    };

    const client = this.getS3();

    await client.send(new DeleteObjectCommand(params));
  }

  async listFiles() {
    const params = {
      Bucket: 'personal-projects-images',
    };

    const client = this.getS3();

    const files = await client.send(new ListObjectsV2Command(params));

    return {
      values: files.Contents.map((file) => {
        return {
          key: file.Key,
          length: file.Size,
        };
      }),
    };
  }
}
