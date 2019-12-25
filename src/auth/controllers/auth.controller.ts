import { RegisterUserPayload } from 'src/auth/dto/register-user.dto';

import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from '../services/auth.service';

@Controller({ path: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard())
  logout(@Request() req) {
    return this.authService.logout(req.user);
  }

  @Post('register')
  register(@Body() payload: RegisterUserPayload) {
    console.log(payload);
  }

  @Post('confirm-registration')
  confirmRegistration() {}

  @Post('forgot-password')
  forgotPassword() {}

  @Post('reset-password')
  resetPassword() {}
}
