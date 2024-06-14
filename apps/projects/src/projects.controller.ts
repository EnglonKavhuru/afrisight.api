import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller("projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}


  @Post()
  async createProject (@Body() data: { tittle: string; description: string; status: string; deleted : boolean }) {
    return await this.projectsService.createProject(data);
  }


  @Get()
  async getProjects() {
    return await this.projectsService.getProjects();
  }

  @Get(':id')
  async getProject(@Param('id') id : string ) {
    return await this.projectsService.getProject(Number(id));
  }

  @Put(':id')
  async updateProject (@Param('id') id: string, @Body() data: { name : string; email?: string; }) {
    return await this.projectsService.updateProject(Number(id), data );
  }

  @Put(':status/:id')
  async inprogressProject(@Param('id') id: string, @Param('status') status : string ) {
    if ( status === "INPROGRESS" ) {
      return await this.projectsService.inprogressProject(Number(id));
    }else if ( status === "COMPLETED" ) {
      return await this.projectsService.completedProject(Number(id));
    }else {
      return "Unsupported status"
    }
    
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: string ) {
    return await this.projectsService.deleteProject(Number(id));
  }

 
}
