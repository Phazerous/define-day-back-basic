import { Injectable, BadRequestException } from '@nestjs/common';
import User from 'src/typeorm/User';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUserByEmail(email: string): Promise<User> {
    const user = this.userRepository.findOneBy({
      email: ILike(email),
    });

    return user;
  }

  async createUser(email: string, password: string) {
    const user = this.userRepository.save({ email, password });

    return user;
  }
}
