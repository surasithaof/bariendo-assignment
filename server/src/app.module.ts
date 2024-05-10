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

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }, // e.g. 30s, 7d, 24h
    }),
    CacheModule.register(),
  ],
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
