import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Token from 'src/typeorm/Token';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Token]), UsersModule],
  providers: [AuthService],
})
export class AuthModule {}
