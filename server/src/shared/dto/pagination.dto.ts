import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto<T> {
  data: [T];

  @ApiProperty()
  skip: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  total: number;
}
