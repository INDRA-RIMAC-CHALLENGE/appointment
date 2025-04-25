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
import { CountryISO } from 'src/domain/entity/appointment.entity';

export class CreateScheduleDetailDto {
  @ApiProperty({ type: Number })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  centerId: number;

  @ApiProperty({ type: Number })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  specialityId: number;

  @ApiProperty({ type: Number })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  medicId: number;

  @ApiProperty({ type: Number })
  @IsDateString()
  date: string;
}

export class CreateAppointmentRequestDto {
  @ApiProperty({ type: String })
  @IsString()
  @Length(5, 5)
  insuredId: string;

  @ApiProperty({ type: Number })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  scheduleId: number;

  @ApiProperty({ type: CreateScheduleDetailDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateScheduleDetailDto)
  scheduleDetail: CreateScheduleDetailDto;

  @ApiProperty({ enum: CountryISO })
  @IsEnum(CountryISO)
  countryISO: CountryISO;
}
