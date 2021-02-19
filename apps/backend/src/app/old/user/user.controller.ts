// import { User } from '@backend/data';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'libs/auth/src/lib/jwt-auth.guard';
import { User } from './user.entity';
import { UserService } from './user.service';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  display_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const foundUser: User = await this.userService.findOne(id);
    if (!foundUser) {
      throw new HttpException(
        'User id has no user associated',
        HttpStatus.NOT_FOUND
      );
    }
    return foundUser;
  }

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    return await this.userService.create(body);
  }
}
