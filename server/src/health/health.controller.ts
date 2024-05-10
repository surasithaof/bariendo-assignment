import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('health')
@ApiTags('health')
export class HealthController {
  constructor() {}

  @Get()
  @ApiOkResponse({ description: 'Health check' })
  getHealth() {
    return { status: 'OK' };
  }
}
