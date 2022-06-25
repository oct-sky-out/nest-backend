import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { UserService } from '../user.service';
import { sampleUpdateUser, sampleUser } from './testData';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be saved user', () => {
    service.create = jest.fn((_user) => true);

    expect(service.create(sampleUpdateUser)).toEqual(true);
    expect(service.create).toBeCalledTimes(1);
  });

  it('should be find All user', async () => {
    service.findAll = jest.fn(async () => [sampleUser]);

    expect(await service.findAll()).toEqual([sampleUser]);
    expect(service.findAll).toBeCalledTimes(1);
  });

  it('should be find All users', async () => {
    service.findAll = jest.fn(async () => [sampleUser]);

    expect(await service.findAll()).toEqual([sampleUser]);
    expect(service.findAll).toBeCalledTimes(1);
  });

  it('should be find user', async () => {
    const where: Prisma.UserWhereUniqueInput = {
      id: 'id1234',
    };
    service.findOne = jest.fn(async (_where) => sampleUser);

    expect(await service.findOne(where)).toEqual(sampleUser);
    expect(service.findOne).toBeCalledTimes(1);
  });

  it('should be update user information', async () => {
    const where: Prisma.UserWhereUniqueInput = {
      id: 'id1234',
    };
    const user: Prisma.UserUpdateInput = {
      age: 23,
      email: 'abc@example.com',
      name: 'name',
      password: 'hash',
    };
    service.update = jest.fn((_where, _user) => true);

    expect(await service.update(where, user)).toEqual(true);
    expect(service.update).toBeCalledTimes(1);
  });

  it('should be delete user', async () => {
    const where: Prisma.UserWhereUniqueInput = {
      id: 'id1234',
    };

    service.remove = jest.fn((_where) => true);

    expect(await service.remove(where)).toEqual(true);
    expect(service.remove).toBeCalledTimes(1);
  });
});
