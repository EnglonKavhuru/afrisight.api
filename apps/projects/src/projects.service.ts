import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/common/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async createProject (data: { tittle: string; description: string; deleted: boolean })  {
    return await this.prisma.projects.create({
      data : {
        ...data,
        authorId : (await this.prisma.user.findFirst()).id
      }
    });
  }

  async getProjects()  {
    return await this.prisma.projects.findMany({
      where : {
        deleted : false
      }
    });
  }

  async getProject( id : number )  {
    return await this.prisma.projects.findFirst({
      where : {
        id : id,
        deleted : false
      }
    });
  }

  async updateProject ( id: number, data: { name?: string; email?: string; deleted?: boolean; } )  {
    return await this.prisma.projects.update({
      where : {id},
      data : data
    });
  }

  async deleteProject( id : number, )  {
    return await this.prisma.projects.update({
      where : {id},
      data : {
        deleted : true
      }
    });
  }

  async inprogressProject( id : number )  {
    return await this.prisma.projects.update({
      where : {id},
      data : {
        status : "INPROGRESS"
      }
    });
  }

  async completedProject( id : number )  {
    return await this.prisma.projects.update({
      where : {id},
      data : {
        status : "COMPLETED"
      }
    });
  }

}
