import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Token from 'src/typeorm/Token';
import User from 'src/typeorm/User';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Token])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
