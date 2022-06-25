import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() userInput: Prisma.UserCreateInput) {
    return this.userService.create(userInput);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: Prisma.UserWhereUniqueInput) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: Prisma.UserWhereUniqueInput,
    @Body() updateUserDto: Prisma.UserUpdateInput,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: Prisma.UserWhereUniqueInput) {
    return this.userService.remove(id);
  }
}
