import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { User } from './user.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './user.controller';

// const fakeUsers: User[] = [
//   {
//     id: 1,
//     firstName: 'Joseph',
//     lastName: 'Aoun',
//     email: 'president@northeastern.edu',
//   },
//   {
//     id: 2,
//     firstName: 'Waleed',
//     lastName: 'Meleis',
//     email: 'w.meleis@northeastern.edu',
//   },
// ];

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.display_name = createUserDto.display_name;
    user.email = createUserDto.email;
    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
