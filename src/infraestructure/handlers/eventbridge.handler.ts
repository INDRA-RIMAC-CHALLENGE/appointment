import { INestApplication } from '@nestjs/common';
import { SQSEvent } from 'aws-lambda';
import { initApplication } from 'src/app';
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
    const detail = JSON.parse(eventBridgeMessage.Detail);

    const appointment = new Appointment(detail);
    appointment.status = AppointmentStatus.COMPLETED;

    await updateAppointmentHandler.handler(appointment);
  }

  return { statusCode: 200 };
};
