import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/common/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccountsService {
  constructor(
    private prisma: PrismaService, 
    private jwtService: JwtService
  ) {}

  async createUser (data: { name: string; email: string; password: string })  {

    const hashedPassword = bcrypt.hashSync(data.password, 10);

    return await this.prisma.user.create({
      data : {
        name :data.name ,
        email : data.email,
        password : hashedPassword
      }
    });
    
  }

  async getStudents()  {
    return await this.prisma.user.findMany({
      where : {
        deleted : false
      }
    });
  }

  async validateUser(email: string, password: string): Promise<any> {

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user && bcrypt.compareSync(password, user.password)) {
      const { ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
    
  }
  


  async getStudent( id : number )  {
    return await this.prisma.user.findFirst({
      where : {
        id : id,
        deleted : false
      }
    });
  }

  async updateUser ( id: number, data: { name?: string; email?: string; deleted?: boolean; } )  {
    return await this.prisma.user.update({
      where : {id},
      data : data
    });
  }

  async deleteUser( id : number, )  {
    return await this.prisma.user.update({
      where : {id},
      data : {
        deleted : true
      }
    });
  }


}
