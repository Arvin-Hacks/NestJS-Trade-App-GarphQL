import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    { id: 1, email: 'user@example.com', role: 'USER' },
    { id: 2, email: 'admin@example.com', role: 'ADMIN' },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | undefined {
    return this.users.find((u) => u.id === id);
  }
}
