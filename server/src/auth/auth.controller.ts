import { Body, Controller, Delete, Post } from '@nestjs/common';
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up';
import { AuthEntity } from './entities/auth.entity';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  private readonly authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @Post('/sign-up')
  @ApiOkResponse({ description: 'User signed up', type: AuthEntity })
  async signUp(@Body() createUserDto: SignUpDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('/sign-in')
  @ApiOkResponse({ description: 'User signed in', type: AuthEntity })
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('refresh-token')
  @ApiOkResponse({ description: 'Refresh token', type: AuthEntity })
  async refreshToken(@Body() refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @Delete('sign-out')
  @ApiNoContentResponse({ description: 'User signed out' })
  async signOut(@Body() refreshToken: string) {
    this.authService.signOut(refreshToken);
  }
}
