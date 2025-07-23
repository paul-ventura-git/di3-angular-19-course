export type UserRole = 'admin' | 'sales' | 'manager' | 'customer';

export interface User {
  id: number;
  name: string;
  email: string;
  roles: UserRole[];
}

export const users: User[] = [
  {
    id: 1,
    name: 'Admin',
    roles: ['admin'],
    email: 'admin@miempresa.com',
  },
  {
    id: 2,
    name: 'Bob',
    roles: ['sales', 'manager'],
    email: 'bob@miempresa.com',
  },
  {
    id: 3,
    name: 'Charlie',
    roles: ['manager'],
    email: 'charlie@miempresa.com',
  },
  {
    id: 4,
    name: 'David',
    roles: ['sales'],
    email: 'david@miempresa.com',
  },
  {
    id: 5,
    name: 'many',
    roles: ['customer'],
    email: 'customer@gmail.com',
  }
];
