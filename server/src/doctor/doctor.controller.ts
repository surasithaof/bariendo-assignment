import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DoctorDto } from 'src/user/dto/doctor.dto';
import { DoctorService } from './doctor.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('doctors')
@ApiTags('doctors')
export class DoctorController {
  private doctorService: DoctorService;
  constructor(doctorService: DoctorService) {
    this.doctorService = doctorService;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOkResponse({ description: 'Users list', type: [DoctorDto] })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getDoctors(@Query('orgId') orgId: number): Promise<DoctorDto[]> {
    return this.doctorService.getDoctors(orgId);
  }
}
