import { Module } from '@nestjs/common';
import { DynamoDBService } from './dynamodb.service';
import { SnsService } from './sns.service';

@Module({
  providers: [DynamoDBService, SnsService],
  imports: [],
  exports: [DynamoDBService, SnsService],
})
export class AwsModule {}
