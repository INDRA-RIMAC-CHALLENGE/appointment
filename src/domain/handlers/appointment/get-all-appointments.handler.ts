import { Injectable } from '@nestjs/common';
import { Appointment } from 'src/domain/entity/appointment.entity';
import { IAppointmentRepository } from 'src/domain/repositories/appointment.repository';

@Injectable()
export class GetAllAppointmentsHandler {
  constructor(private readonly appointmentRepository: IAppointmentRepository) {}

  public async handler(): Promise<Appointment[]> {
    return this.appointmentRepository.getAllAppointments();
  }
}
