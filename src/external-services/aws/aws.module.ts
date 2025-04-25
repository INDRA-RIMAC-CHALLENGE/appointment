import { Module } from '@nestjs/common';
import { DynamoDBService } from './dynamodb.service';

@Module({
  providers: [DynamoDBService],
  imports: [],
  exports: [DynamoDBService],
})
export class AwsModule {}
