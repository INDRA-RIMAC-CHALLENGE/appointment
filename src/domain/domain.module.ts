import { Module } from '@nestjs/common';
import { GetAllAppointmentsHandler } from './handlers/appointment/get-all-appointments.handler';
import { InfraestructureModule } from 'src/infraestructure/infraestructure.module';
import { ExternalServicesModule } from 'src/external-services/external-services.module';
import { CreateAppointmentHandler } from './handlers/appointment/create-appointment.handler';
import { GetAppointmentHandler } from './handlers/appointment/get-appointment.handler';
import { UpdateAppointmentHandler } from './handlers/appointment/update-appointment.handler';
import { RemoveAppointmentHandler } from './handlers/appointment/remove-appointment.handler';

const handlers = [
  GetAllAppointmentsHandler,
  GetAppointmentHandler,
  CreateAppointmentHandler,
  UpdateAppointmentHandler,
  RemoveAppointmentHandler,
];

@Module({
  providers: handlers,
  imports: [ExternalServicesModule, InfraestructureModule],
  exports: handlers,
})
export class DomainModule {}
