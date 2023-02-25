import {
  Body,
  Controller,
  Post,
  Request,
  Res,
  Get,
  UseGuards,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { AuthService } from './auth.service';
import UserCreateDto from './dto/UserCreateDto';
import LocalAuthGuard from './strategy/local-auth.guard';

const TOKEN_EXPIRES_TIME = 7 * 24 * 60 * 60 * 1000;

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post('signup')
  async signup(
    @Body() userCreateDto: UserCreateDto,
    @Res({ passthrough: true }) response: ExpressResponse,
  ) {
    const token = await this.authService.signup(userCreateDto);
    response.cookie('token', token, {
      maxAge: TOKEN_EXPIRES_TIME,
    });

    return token;
  }

  @Get('signout')
  async signout(
    @Req() req: ExpressRequest,
    @Res({ passthrough: true }) res: ExpressResponse,
  ) {
    const token = req.cookies['token'];

    if (token) await this.authService.signout(token);

    res.cookie('token', '', {
      maxAge: 1,
    });
  }

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  async login(
    @Request() req,
    @Res({ passthrough: true }) response: ExpressResponse,
  ) {
    const token = req.user;

    response.cookie('token', token, {
      maxAge: TOKEN_EXPIRES_TIME,
    });
  }
}
