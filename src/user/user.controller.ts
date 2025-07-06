import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { User, CreateUser } from './user.entity';
import { UserRepository } from './user.repository';

@Controller('user')
export class UserController {
  constructor(private repo: UserRepository) {}

  @Get()
  async findAll() {
    const users = await this.repo.findAll();
    return users ? users : { message: 'no have' };
  }

  @Post()
  async create(@Body() user: CreateUser) {
    const newUser = await this.repo.create(user);
    return newUser;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() user: CreateUser) {
    const updateUser = await this.repo.update({
      id: +id,
      ...user,
    });
    return updateUser;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const users = await this.repo.findOne(+id);
    return users ? users : { message: 'no have' };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.repo.delete(+id);
  }
}
