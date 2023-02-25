import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import Token from './typeorm/Token';
import User from './typeorm/User';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WordsModule } from './words/words.module';
import Word from './typeorm/Word';
import Definition from './typeorm/Definition';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      entities: [User, Token, Word, Definition],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    WordsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
