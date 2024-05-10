import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class GetAppointmentsQuery {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  orgId?: number;

  @ApiProperty({ required: false, default: 0 })
  @IsOptional()
  @Type(() => Number)
  skip?: number = 0;

  @ApiProperty({ required: false, default: 10 })
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Date)
  startDate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Date)
  endDate?: Date;
}
