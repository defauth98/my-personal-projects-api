import AWS from '@aws-sdk/client-s3';

export default class AwsS3Manager {
  static instance: AWS.S3;

  static getInstance() {
    if (!this.instance) {
      this.instance = new AWS.S3({
        apiVersion: '2006-03-01',
        region: process.env.MY_AWS_REGION,
        credentials: {
          accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
        },
      });
    }

    return this.instance;
  }
}
