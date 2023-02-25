import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Token from 'src/typeorm/Token';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import LocalAuthGuard from './strategy/local-auth.guard';
import CookieAuthGuard from './strategy/cookie-auth.guard';
import LocalStrategy from './strategy/local.strategy';
import CookieStrategy from './strategy/cookie.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Token]), UsersModule],
  providers: [AuthService, LocalStrategy, CookieStrategy, LocalAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
