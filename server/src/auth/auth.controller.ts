import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up';
import { AuthDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refresh.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  private readonly authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @Post('/sign-up')
  @ApiOkResponse({ description: 'User signed up', type: AuthDto })
  @HttpCode(201)
  async signUp(@Body() createUserDto: SignUpDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('/sign-in')
  @ApiOkResponse({ description: 'User signed in', type: AuthDto })
  @HttpCode(200)
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('refresh-token')
  @ApiOkResponse({ description: 'Refresh token', type: AuthDto })
  @HttpCode(200)
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(
      refreshTokenDto.accessToken,
      refreshTokenDto.refreshToken,
    );
  }
}
