import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  constructor() {}

  @Get()
  getHealth() {
    return { status: 'OK' };
  }
}
