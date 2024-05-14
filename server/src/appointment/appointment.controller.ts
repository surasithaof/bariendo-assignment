import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AppointmentService } from './appointment.service';
import { AppointmentEntity } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { GetAppointmentsQuery } from './dto/get-appointment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('appointments')
@ApiTags('appointments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AppointmentController {
  private readonly appointmentService: AppointmentService;
  constructor(appointmentService: AppointmentService) {
    this.appointmentService = appointmentService;
  }

  @Get()
  @ApiOkResponse({ description: 'Appointment list', type: [AppointmentEntity] })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getAppointments(@Query() queryParams: GetAppointmentsQuery) {
    return this.appointmentService.getAppointments(queryParams);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Appointment', type: AppointmentEntity })
  @ApiNotFoundResponse({ description: 'Appointment not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getAppointmentById(@Param('id', ParseIntPipe) id: number) {
    const appointment = await this.appointmentService.getAppointmentById(id);
    if (!appointment) {
      throw new HttpException('Appointment not found', HttpStatus.NOT_FOUND);
    }
    return appointment;
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Appointment created',
    type: AppointmentEntity,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async createAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
    const appointment = await this.appointmentService.createAppointment(
      createAppointmentDto,
    );
    return appointment;
  }
}
