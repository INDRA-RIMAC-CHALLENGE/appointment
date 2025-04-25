import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString, Length, Min } from 'class-validator';

export class GetAppointmentRequestDto {
  @ApiProperty({ type: String })
  @IsString()
  @Length(5, 5)
  insuredId: string;

  @ApiProperty({ type: Number })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  scheduleId: number;
}
