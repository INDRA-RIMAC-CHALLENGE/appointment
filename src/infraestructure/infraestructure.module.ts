import { Module, Provider } from '@nestjs/common';
import { AppointmentRepository } from './repositories/appointment.repository';
import { IAppointmentRepository } from 'src/domain/repositories/appointment.repository';
import { ExternalServicesModule } from 'src/external-services/external-services.module';

const providers: Provider[] = [
  { provide: IAppointmentRepository, useClass: AppointmentRepository },
];

@Module({
  providers: providers,
  imports: [ExternalServicesModule],
  exports: providers,
})
export class InfraestructureModule {}
