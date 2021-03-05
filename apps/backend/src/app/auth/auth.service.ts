import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/User';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(displayName: string, email: string): Promise<User> {
    const user = await this.usersService.findOne(displayName, email);
    if (user) {
      return user;
    } else {
      return this.usersService
        .createUser(displayName, email)
        .then(() => {
          return this.usersService.findOne(displayName, email);
        })
        .catch(() => {
          throw new HttpException(
            'user creation failed, duplicated email?',
            HttpStatus.BAD_REQUEST
          );
        });
    }
  }

  async login(user: User) {
    const payload = {
      displayName: user.displayName,
      email: user.email,
      userId: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
