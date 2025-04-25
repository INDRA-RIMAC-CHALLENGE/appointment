import { Module } from '@nestjs/common';
import { AwsModule } from './aws/aws.module';

@Module({
  exports: [AwsModule],
  imports: [AwsModule],
})
export class ExternalServicesModule {}
