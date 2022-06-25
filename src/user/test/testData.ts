import { Prisma, User } from '@prisma/client';

export const sampleUpdateUser: Prisma.UserCreateInput = {
  age: 26,
  email: 'abc@example.com',
  name: 'name',
  password: 'hash',
};

export const sampleUser: User = {
  age: 26,
  email: 'abc@example.com',
  name: 'name',
  password: 'hash',
  id: 'id1234',
};
