import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/shared/guards/at.guard';
import { CreateProjectDto } from './dto';
import { ProjectsService } from './projects.service';
import { GetCurrentUser } from 'src/shared/decorators/get-current-user.decorator';
import { AuthJwtPayloadDTO } from 'src/tokens/dto/authJwtPayload.dto';
import { ProjectDTO } from 'src/shared/dto/project.dto';
import { ZodSerializerDto } from 'nestjs-zod';

@Controller('projects')
export class ProjectsController {
  constructor(private projectService: ProjectsService) {}

  @ZodSerializerDto(ProjectDTO)
  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() body: CreateProjectDto,
    @GetCurrentUser() user: AuthJwtPayloadDTO,
  ) {
    return this.projectService.create(body, user.sub);
  }

  @ZodSerializerDto(ProjectDTO)
  @Get()
  @UseGuards(AuthGuard)
  async getAll(@GetCurrentUser() user: AuthJwtPayloadDTO) {
    return this.projectService.getAllByUserId(user.sub);
  }

  @ZodSerializerDto(ProjectDTO)
  @Get(':id')
  @UseGuards(AuthGuard)
  async getById(
    @Param('id') projectId: string,
    @GetCurrentUser() user: AuthJwtPayloadDTO,
  ) {
    return this.projectService.getUserProjectById(user.sub, projectId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @UseGuards(AuthGuard)
  async removeById(
    @Param('id') projectId: string,
    @GetCurrentUser() user: AuthJwtPayloadDTO,
  ): Promise<void> {
    await this.projectService.removeById(projectId, user.sub);
  }
}
