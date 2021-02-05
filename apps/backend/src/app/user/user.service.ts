import { Injectable } from '@nestjs/common';

import { User } from '@backend/data';

const fakeUsers: User[] = [
  {
    id: 1,
    firstName: 'Joseph',
    lastName: 'Aoun',
    email: 'president@northeastern.edu',
  },
  {
    id: 2,
    firstName: 'Waleed',
    lastName: 'Meleis',
    email: 'w.meleis@northeastern.edu',
  },
];

@Injectable()
export class UserService {
  getUsers(): User[] {
    //would do a database call here?
    return fakeUsers;
  }

  getUserById(id: string): User {
    const idAsNumber = Number(id);
    const searchedUser: User = fakeUsers.find(
      (user: User): boolean => user.id === idAsNumber
    );
    return searchedUser;
  }
}
