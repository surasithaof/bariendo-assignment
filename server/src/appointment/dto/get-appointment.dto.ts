import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class GetAppointmentsQuery {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  orgId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  patientUserId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  doctorUserId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Date)
  startDate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Date)
  endDate?: Date;
}
