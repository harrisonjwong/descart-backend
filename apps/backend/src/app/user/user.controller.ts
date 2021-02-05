import { User } from '@backend/data';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from 'libs/auth/src/lib/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    const foundUser: User = this.userService.getUserById(id);
    if (!foundUser) {
      throw new HttpException(
        'User id has no user associated',
        HttpStatus.NOT_FOUND
      );
    }
    return foundUser;
  }
}
