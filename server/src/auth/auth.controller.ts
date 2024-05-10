import { Body, Controller, Delete, HttpCode, Post } from '@nestjs/common';
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up';
import { AuthEntity } from './entities/auth.entity';
import { RefreshTokenDto } from './dto/refresh.dto';
import { SignOutDto } from './dto/sign-out.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  private readonly authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @Post('/sign-up')
  @ApiOkResponse({ description: 'User signed up', type: AuthEntity })
  @HttpCode(201)
  async signUp(@Body() createUserDto: SignUpDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('/sign-in')
  @ApiOkResponse({ description: 'User signed in', type: AuthEntity })
  @HttpCode(200)
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('refresh-token')
  @ApiOkResponse({ description: 'Refresh token', type: AuthEntity })
  @HttpCode(200)
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }

  @Delete('sign-out')
  @ApiNoContentResponse({ description: 'User signed out' })
  @HttpCode(204)
  async signOut(@Body() signOutDto: SignOutDto) {
    return this.authService.signOut(signOutDto.refreshToken);
  }
}
