import { Injectable } from '@nestjs/common';
import { SNS } from 'aws-sdk';
import { envConfig, Environment } from 'src/infraestructure/config/main.config';

@Injectable()
export class SnsService {
  private sns: SNS;

  constructor() {
    this.sns =
      envConfig.NODE_ENV === Environment.local
        ? new SNS({
            region: envConfig.AWS_REGION,
            accessKeyId: envConfig.AWS_ACCESS_KEY_ID,
            secretAccessKey: envConfig.AWS_SECRET_ACCESS_KEY,
          })
        : new SNS();
  }

  async publish(snsTopicArn: string, message: object) {
    return this.sns
      .publish({
        TopicArn: snsTopicArn,
        Message: JSON.stringify(message),
      })
      .promise();
  }
}
