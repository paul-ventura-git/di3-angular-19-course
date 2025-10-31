export type UserRole = 'admin' | 'veterinary';

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
    roles: ['veterinary'],
    email: 'bob@miempresa.com',
  },
  {
    id: 3,
    name: 'Charlie',
    roles: ['veterinary'],
    email: 'charlie@miempresa.com',
  }
];
