import { Injectable } from '@nestjs/common';
import { Appointment } from 'src/domain/entity/appointment.entity';
import { IAppointmentRepository } from 'src/domain/repositories/appointment.repository';
import { GetAppointmentHandler } from './get-appointment.handler';
import { GetAppointmentRequestDto } from 'src/application/dto/appointment/get-appointment.dto';
import { UpdateAppointmentRequestDto } from 'src/application/dto/appointment/udpate-appointment.dto';

@Injectable()
export class UpdateAppointmentHandler {
  constructor(
    private readonly getAppointmentHandler: GetAppointmentHandler,
    private readonly appointmentRepository: IAppointmentRepository,
  ) {}

  public async handler(
    appointmentDto: UpdateAppointmentRequestDto,
  ): Promise<Appointment> {
    const paramsGetAppointment: GetAppointmentRequestDto = {
      insuredId: appointmentDto.insuredId,
      scheduleId: appointmentDto.scheduleId,
    };

    Object.keys(appointmentDto).forEach((key) => {
      !appointmentDto[key] && delete appointmentDto[key];
    });

    if (appointmentDto.scheduleDetail)
      Object.keys(appointmentDto.scheduleDetail).forEach((key) => {
        !appointmentDto.scheduleDetail[key] &&
          delete appointmentDto.scheduleDetail[key];
      });

    const record =
      await this.getAppointmentHandler.handler(paramsGetAppointment);

    const updatedAppointment = new Appointment({
      ...record,
      ...appointmentDto,
      scheduleDetail: {
        ...record?.scheduleDetail,
        ...appointmentDto.scheduleDetail,
      },
    });

    await this.appointmentRepository.updateAppointment(updatedAppointment);

    return updatedAppointment;
  }
}
