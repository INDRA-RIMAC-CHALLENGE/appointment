import { INestApplication } from '@nestjs/common';
import { SQSEvent } from 'aws-lambda';
import { initApplication } from 'src/app';
import { UpdateAppointmentRequestDto } from 'src/application/dto/appointment/udpate-appointment.dto';
import {
  Appointment,
  AppointmentStatus,
} from 'src/domain/entity/appointment.entity';
import { UpdateAppointmentHandler } from 'src/domain/handlers/appointment/update-appointment.handler';

let app: INestApplication<any>;
let updateAppointmentHandler: UpdateAppointmentHandler;

export const handler = async (event: SQSEvent) => {
  if (!app) {
    const [appInstance] = await initApplication();
    app = appInstance;
  }

  updateAppointmentHandler =
    updateAppointmentHandler ?? app.get(UpdateAppointmentHandler);

  for (const record of event.Records) {
    const eventBridgeMessage = JSON.parse(record.body);
    const detail = eventBridgeMessage.detail as Appointment;

    console.log('EventBridge Message', eventBridgeMessage);

    const appointment: UpdateAppointmentRequestDto = {
      insuredId: detail.insuredId,
      scheduleId: detail.scheduleId,
      status: AppointmentStatus.COMPLETED,
    };

    const updatedAppointment =
      await updateAppointmentHandler.handler(appointment);

    console.log('Appointment actualizado', updatedAppointment);
  }

  return { statusCode: 200 };
};
