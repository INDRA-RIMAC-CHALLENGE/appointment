import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAppointmentRequestDto } from 'src/application/dto/appointment/create-appointment.dto';
import { Appointment } from 'src/domain/entity/appointment.entity';
import { IAppointmentRepository } from 'src/domain/repositories/appointment.repository';
import { GetAppointmentRequestDto } from 'src/application/dto/appointment/get-appointment.dto';

@Injectable()
export class CreateAppointmentHandler {
  constructor(private readonly appointmentRepository: IAppointmentRepository) {}

  public async handler(
    appointmentDto: CreateAppointmentRequestDto,
  ): Promise<Appointment> {
    const paramsGetAppointment: GetAppointmentRequestDto = {
      insuredId: appointmentDto.insuredId,
      scheduleId: appointmentDto.scheduleId,
    };

    const record =
      await this.appointmentRepository.getAppointment(paramsGetAppointment);

    if (record)
      throw new HttpException(
        `El Appointment con insuredId: ${appointmentDto.insuredId} y scheduleId: ${appointmentDto.scheduleId} ya existe`,
        HttpStatus.FOUND,
      );

    return this.appointmentRepository.createAppointment(appointmentDto);
  }
}
