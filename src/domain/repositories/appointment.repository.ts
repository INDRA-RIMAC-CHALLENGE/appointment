import { CreateAppointmentRequestDto } from 'src/application/dto/appointment/create-appointment.dto';
import { Appointment } from '../entity/appointment.entity';
import { GetAppointmentRequestDto } from 'src/application/dto/appointment/get-appointment.dto';
import { UpdateAppointmentRequestDto } from 'src/application/dto/appointment/udpate-appointment.dto';
import { RemoveAppointmentRequestDto } from 'src/application/dto/appointment/remove-appointment.dto';

export abstract class IAppointmentRepository {
  constructor() {}

  abstract getAllAppointments(): Promise<Appointment[]>;

  abstract getAppointment(
    params: GetAppointmentRequestDto,
  ): Promise<Appointment | null>;

  abstract createAppointment(
    params: CreateAppointmentRequestDto,
  ): Promise<Appointment>;

  abstract updateAppointment(params: Appointment): Promise<Appointment>;

  abstract removeAppointment(params: Appointment): Promise<Appointment>;
}
