import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { User } from '../../entities/User';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async findOne(displayName: string, email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: [{ displayName, email }],
    });
  }

  async createUser(displayName: string, email: string): Promise<InsertResult> {
    return this.userRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        displayName,
        email,
      })
      .execute();
  }
}
