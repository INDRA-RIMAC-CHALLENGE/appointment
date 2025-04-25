import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { GetAllAppointmentsHandler } from 'src/domain/handlers/appointment/get-all-appointments.handler';
import { CreateAppointmentRequestDto } from '../dto/appointment/create-appointment.dto';
import { CreateAppointmentHandler } from 'src/domain/handlers/appointment/create-appointment.handler';
import { GetAppointmentRequestDto } from '../dto/appointment/get-appointment.dto';
import { GetAppointmentHandler } from 'src/domain/handlers/appointment/get-appointment.handler';
import { UpdateAppointmentRequestDto } from '../dto/appointment/udpate-appointment.dto';
import { UpdateAppointmentHandler } from 'src/domain/handlers/appointment/update-appointment.handler';
import { RemoveAppointmentRequestDto } from '../dto/appointment/remove-appointment.dto';
import { RemoveAppointmentHandler } from 'src/domain/handlers/appointment/remove-appointment.handler';

@Controller('appointments')
export class AppointmentController {
  constructor(
    private getAllAppointmentsHandler: GetAllAppointmentsHandler,
    private getAppointmentHandler: GetAppointmentHandler,
    private createAppointmentHandler: CreateAppointmentHandler,
    private udpateAppointmentHandler: UpdateAppointmentHandler,
    private removeAppointmentHandler: RemoveAppointmentHandler,
  ) {}

  @Get('GetAllAppointments')
  public async getAllAppointments() {
    return await this.getAllAppointmentsHandler.handler();
  }

  @Get('GetAppointment')
  public async getAppointment(
    @Query() getAppointmentRequestDto: GetAppointmentRequestDto,
  ) {
    return await this.getAppointmentHandler.handler(getAppointmentRequestDto);
  }

  @Post('CreateAppointment')
  public async createAppointment(
    @Body() createAppointmentRequestDto: CreateAppointmentRequestDto,
  ) {
    return await this.createAppointmentHandler.handler(
      createAppointmentRequestDto,
    );
  }

  @Put('UpdateAppointment')
  public async updateAppointment(
    @Body() updateAppointmentRequestDto: UpdateAppointmentRequestDto,
  ) {
    return await this.udpateAppointmentHandler.handler(
      updateAppointmentRequestDto,
    );
  }

  @Delete('RemoveAppointment')
  public async removeAppointment(
    @Body() removeAppointmentRequestDto: RemoveAppointmentRequestDto,
  ) {
    return await this.removeAppointmentHandler.handler(
      removeAppointmentRequestDto,
    );
  }
}
