import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up';
import { AuthEntity } from './entities/auth.entity';
import { UserService } from 'src/user/user.service';

// TODO: Implement the methods

@Injectable()
export class AuthService {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  signUp(createUserDto: SignUpDto): AuthEntity {
    console.log(createUserDto);
    return new AuthEntity();
  }

  signIn(signInDto: SignInDto): AuthEntity {
    console.log(signInDto);
    return new AuthEntity();
  }

  refreshToken(refreshToken: string): AuthEntity {
    console.log(refreshToken);
    return new AuthEntity();
  }

  signOut(refreshToken: string) {
    console.log(refreshToken);
  }
}
