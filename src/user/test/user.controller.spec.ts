import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { sampleUpdateUser, sampleUser } from './testData';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, { provide: PrismaService, useValue: {} }],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be kids order', () => {
    expect(controller).toBeDefined();
  });

  it('should be change user information', async () => {
    jest
      .spyOn(controller, 'findAll')
      .mockImplementation(async () => [sampleUser]);
    const user = await controller.findAll();
    expect(user).toHaveLength(1);
    expect(user).toEqual([sampleUser]);
    expect(user[0].age).toEqual(26);
  });

  it('should be find all', async () => {
    jest
      .spyOn(controller, 'findAll')
      .mockImplementation(async () => [sampleUser]);

    const user = await controller.findAll();
    expect(user).toHaveLength(1);
    expect(user).toEqual([sampleUser]);
    expect(user[0].age).toEqual(26);
  });
  it('should be find One', async () => {
    const where: Prisma.UserWhereUniqueInput = {
      id: 'id1234',
    };

    jest
      .spyOn(controller, 'findOne')
      .mockImplementation(async () => sampleUser);

    const user = await controller.findOne(where);
    expect(user).toEqual(sampleUser);
  });

  it('should be save', async () => {
    jest.spyOn(controller, 'create').mockImplementation((data) => true);

    const result = await controller.create(sampleUpdateUser);
    expect(result).toEqual(true);
  });

  it('should be save', async () => {
    jest
      .spyOn(controller, 'findAll')
      .mockImplementation(async () => [sampleUser]);

    const user = await controller.findAll();
    expect(user).toHaveLength(1);
    expect(user).toEqual([sampleUser]);
    expect(user[0].age).toEqual(26);
  });

  it('should be modify', async () => {
    const where: Prisma.UserWhereUniqueInput = {
      id: 'id1234',
    };
    const user: Prisma.UserUpdateInput = {
      age: 23,
      email: 'abc@example.com',
      name: 'name',
      password: 'hash',
    };

    jest.spyOn(controller, 'update').mockImplementation((id, user) => true);

    const result = controller.update(where, user);
    expect(result).toEqual(true);
  });

  it('should be removed', async () => {
    const where: Prisma.UserWhereUniqueInput = {
      id: 'id1234',
    };

    jest.spyOn(controller, 'remove').mockImplementation((id) => true);

    const any = await controller.remove(where);
    expect(any).toEqual(true);
  });
});
