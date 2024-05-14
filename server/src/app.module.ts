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
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtStrategy } from './auth/jwt.strategy';
import { DoctorService } from './doctor/doctor.service';
import { DoctorController } from './doctor/doctor.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt', global: true }),
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }, // e.g. 30s, 7d, 24h
      global: true,
    }),
    CacheModule.register(),
  ],
  controllers: [
    HealthController,
    UserController,
    AuthController,
    OrgController,
    AppointmentController,
    DoctorController,
  ],
  providers: [
    UserService,
    AuthService,
    OrgService,
    AppointmentService,
    PrismaService,
    JwtStrategy,
    DoctorService,
  ],
})
export class AppModule {}
