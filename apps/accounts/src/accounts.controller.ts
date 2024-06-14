import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('users')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  async createStudent(@Body() data: { name: string; email: string; password: string; deleted : boolean }) {
    return await this.accountsService.createUser(data);
  }
  @Post("login")
  async login(@Body() data: { email: string; password: string; }) {
    return  this.accountsService.login(data);
  }

  @Get()
  async getStudents() {
    return await this.accountsService.getStudents();
  }

  @Get(':id')
  async getStudent(@Param('id') id : string ) {
    return await this.accountsService.getStudent(Number(id));
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() data: { name : string; email?: string; }) {
    return await this.accountsService.updateUser(Number(id), data );
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string ) {
    return await this.accountsService.deleteUser(Number(id));
  }

}
