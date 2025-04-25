import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GetAppointmentRequestDto } from 'src/application/dto/appointment/get-appointment.dto';
import { Appointment } from 'src/domain/entity/appointment.entity';
import { IAppointmentRepository } from 'src/domain/repositories/appointment.repository';

@Injectable()
export class GetAppointmentHandler {
  constructor(private readonly appointmentRepository: IAppointmentRepository) {}

  public async handler(
    appointmentDto: GetAppointmentRequestDto,
  ): Promise<Appointment> {
    const record =
      await this.appointmentRepository.getAppointment(appointmentDto);

    if (!record)
      throw new HttpException(
        `No se encontró el Appointment para insuredId: ${appointmentDto.insuredId} y scheduleId: ${appointmentDto.scheduleId}`,
        HttpStatus.NOT_FOUND,
      );

    return record;
  }
}
