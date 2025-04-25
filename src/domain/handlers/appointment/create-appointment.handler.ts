import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateAppointmentRequestDto } from 'src/application/dto/appointment/create-appointment.dto';
import { Appointment } from 'src/domain/entity/appointment.entity';
import { IAppointmentRepository } from 'src/domain/repositories/appointment.repository';
import { GetAppointmentRequestDto } from 'src/application/dto/appointment/get-appointment.dto';
import { SnsService } from 'src/external-services/aws/sns.service';
import { envConfig } from 'src/infraestructure/config/main.config';

@Injectable()
export class CreateAppointmentHandler {
  private logger: Logger = new Logger(CreateAppointmentHandler.name);

  constructor(
    private readonly appointmentRepository: IAppointmentRepository,
    private readonly snsService: SnsService,
  ) {}

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

    const newAppointment =
      await this.appointmentRepository.createAppointment(appointmentDto);

    this.logger.log(
      `Publicando notificacion a SNS ${envConfig.AWS_SNS_TOPIC_ARN}`,
      newAppointment,
    );

    await this.snsService.publish(envConfig.AWS_SNS_TOPIC_ARN, newAppointment);

    this.logger.log('Notificacion publicada');

    return newAppointment;
  }
}
