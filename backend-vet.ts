export type UserRole = 'admin' | 'cashier' | 'customer' | 'visitor';

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
    name: 'Cashier',
    roles: ['cashier'],
    email: 'cashier@miempresa.com',
  },
  {
    id: 3,
    name: 'OnlineCustomer',
    roles: ['customer'],
    email: 'customer@miempresa.com',
  },
  {
    id: 4,
    name: 'Visitor',
    roles: ['visitor'],
    email: 'visitor@miempresa.com',
  }
];
