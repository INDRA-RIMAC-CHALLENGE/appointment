import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  AppointmentStatus,
  CountryISO,
} from 'src/domain/entity/appointment.entity';

export class UpdateScheduleDetailDto {
  @ApiProperty({ type: Number })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  centerId: number;

  @ApiProperty({ type: Number })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  specialityId: number;

  @ApiProperty({ type: Number })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  medicId: number;

  @ApiProperty({ type: Number })
  @IsDateString()
  @IsOptional()
  date: string;
}

export class UpdateAppointmentRequestDto {
  @ApiProperty({ type: String })
  @IsString()
  @Length(5, 5)
  insuredId: string;

  @ApiProperty({ type: Number })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  scheduleId: number;

  @ApiProperty({ type: UpdateScheduleDetailDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateScheduleDetailDto)
  scheduleDetail: UpdateScheduleDetailDto;

  @ApiProperty({ enum: AppointmentStatus })
  @IsEnum(AppointmentStatus)
  @IsOptional()
  status: AppointmentStatus;

  @ApiProperty({ enum: CountryISO })
  @IsEnum(CountryISO)
  @IsOptional()
  countryISO: CountryISO;
}
