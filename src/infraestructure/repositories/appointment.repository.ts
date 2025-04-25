import { Injectable, Logger } from '@nestjs/common';
import { CreateAppointmentRequestDto } from 'src/application/dto/appointment/create-appointment.dto';
import { GetAppointmentRequestDto } from 'src/application/dto/appointment/get-appointment.dto';
import { RemoveAppointmentRequestDto } from 'src/application/dto/appointment/remove-appointment.dto';
import { UpdateAppointmentRequestDto } from 'src/application/dto/appointment/udpate-appointment.dto';
import {
  Appointment,
  RecordStatus,
} from 'src/domain/entity/appointment.entity';
import { IAppointmentRepository } from 'src/domain/repositories/appointment.repository';
import { DynamoDBService } from 'src/external-services/aws/dynamodb.service';

@Injectable()
export class AppointmentRepository implements IAppointmentRepository {
  private readonly logger: Logger;
  private readonly tableName: string = 'AppointmentTable';

  constructor(private readonly dynamoDBService: DynamoDBService) {
    this.logger = new Logger(AppointmentRepository.name);
  }

  async getAllAppointments(): Promise<Appointment[]> {
    const result = await this.dynamoDBService.scanTable('AppointmentTable', {
      recordStatus: RecordStatus.ACTIVE,
    } as Appointment);
    this.logger.log('getAllAppointments', result);
    const appointments = (result.Items || [])?.map((e) => new Appointment(e));
    return appointments;
  }

  async getAppointment(
    params: GetAppointmentRequestDto,
  ): Promise<Appointment | null> {
    const result = await this.dynamoDBService.getItem(this.tableName, params);

    this.logger.log('getAppointment', result);

    if (!Object.keys(result.Item || {}).length) return null;

    const appointment = result.Item && new Appointment(result.Item);

    if (
      !appointment ||
      (appointment && appointment.recordStatus === RecordStatus.INACTIVE)
    )
      return null;

    return appointment;
  }

  async createAppointment(
    params: CreateAppointmentRequestDto,
  ): Promise<Appointment> {
    const appointment = new Appointment(params);

    await this.dynamoDBService.putItem(this.tableName, appointment);

    return appointment;
  }

  async updateAppointment(params: Appointment): Promise<Appointment> {
    await this.dynamoDBService.putItem(this.tableName, params);
    this.logger.log('updateAppointment', params);

    return params;
  }

  async removeAppointment(params: Appointment): Promise<Appointment> {
    params.recordStatus = RecordStatus.INACTIVE;
    this.logger.log('removeAppointment', params);
    await this.dynamoDBService.putItem(this.tableName, params);

    return params;
  }
}
