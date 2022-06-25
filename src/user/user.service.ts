import { Logger, Injectable, HttpStatus, HttpCode } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { hash } from 'bcrypt';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private prisma: PrismaService) {}

  @HttpCode(HttpStatus.CREATED)
  create(data: Prisma.UserCreateInput): boolean {
    try {
      hash(data.password, 10).then(
        (hasedPassword) => (data.password = hasedPassword),
      );

      this.prisma.$transaction([this.prisma.user.create({ data })]);

      return true;
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(where: Prisma.UserWhereUniqueInput) {
    return await this.prisma.user.findUnique({ where });
  }

  update(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput) {
    try {
      this.prisma.$transaction([
        this.prisma.user.update({
          data,
          where,
        }),
      ]);
      return true;
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }

  remove(where: Prisma.UserWhereUniqueInput) {
    try {
      this.prisma.$transaction([this.prisma.user.delete({ where })]);
      return true;
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }
}
