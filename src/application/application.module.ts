import { Module } from '@nestjs/common';
import { AppointmentController } from './controllers/appointment.controller';
import { DomainModule } from 'src/domain/domain.module';

@Module({
  imports: [DomainModule],
  controllers: [AppointmentController],
})
export class ApplicationModule {}
