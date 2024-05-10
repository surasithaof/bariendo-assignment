import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './health/health.controller';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { OrgController } from './org/org.controller';
import { OrgService } from './org/org.service';
import { AppointmentController } from './appointment/appointment.controller';
import { AppointmentService } from './appointment/appointment.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [
    HealthController,
    UserController,
    AuthController,
    OrgController,
    AppointmentController,
  ],
  providers: [
    UserService,
    AuthService,
    OrgService,
    AppointmentService,
    PrismaService,
  ],
})
export class AppModule {}
