import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import Token from 'src/typeorm/Token';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import User from 'src/typeorm/User';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Token) private tokenRepository: Repository<Token>,
    private userService: UsersService,
  ) {}

  async signup(email: string, password: string) {
    const existingUser = await this.userService.getUserByEmail(email);

    if (existingUser)
      throw new BadRequestException(
        'User with specified email address already exists.',
      );

    const hashedPassword = await bcrypt.hash(
      password,
      process.env.SALT_OR_ROUNDS,
    );

    const user = await this.userService.createUser(email, hashedPassword);

    const token = await this.generateTokenForUser(user);

    return token;
  }

  async login(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);

    if (!user)
      throw new BadRequestException(
        `User with specified email address doesn't exist.`,
      );

    const hashedPassword = user.password;

    const matched = await bcrypt.compare(password, hashedPassword);

    if (!matched) throw new UnauthorizedException('Wrong password.');

    const token = await this.generateTokenForUser(user);

    return token;
  }

  private async generateTokenForUser(user: User) {
    const token = await this.tokenRepository.save({
      token: nanoid(22),
      user: user,
    });

    return token.token;
  }
}
