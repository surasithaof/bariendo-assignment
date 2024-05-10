import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  handleRequest(
    ...args: Parameters<
      InstanceType<ReturnType<typeof AuthGuard>>['handleRequest']
    >
  ) {
    if (process.env.AUTH_DEBUG === 'true') {
      console.log('auth debug: JwtAuthGuard.handleRequest()', args);
    }
    return super.handleRequest(...args);
  }
}
