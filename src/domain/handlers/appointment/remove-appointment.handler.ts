import { Injectable } from '@nestjs/common';
import { Appointment } from 'src/domain/entity/appointment.entity';
import { IAppointmentRepository } from 'src/domain/repositories/appointment.repository';
import { GetAppointmentHandler } from './get-appointment.handler';
import { GetAppointmentRequestDto } from 'src/application/dto/appointment/get-appointment.dto';
import { RemoveAppointmentRequestDto } from 'src/application/dto/appointment/remove-appointment.dto';

@Injectable()
export class RemoveAppointmentHandler {
  constructor(
    private readonly getAppointmentHandler: GetAppointmentHandler,
    private readonly appointmentRepository: IAppointmentRepository,
  ) {}

  public async handler(
    appointmentDto: RemoveAppointmentRequestDto,
  ): Promise<Appointment> {
    const paramsGetAppointment: GetAppointmentRequestDto = {
      insuredId: appointmentDto.insuredId,
      scheduleId: appointmentDto.scheduleId,
    };

    const record =
      await this.getAppointmentHandler.handler(paramsGetAppointment);

    await this.appointmentRepository.removeAppointment(record);

    return record;
  }
}
