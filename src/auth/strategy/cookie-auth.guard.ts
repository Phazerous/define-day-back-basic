import { Injectable } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class CookieAuthGuard extends AuthGuard('cookie') {}
