import { Injectable } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { PrismaService } from './../prisma/prisma.service';
import { CreateFolderInput } from './dto/create-folder.input';
import { UpdateFolderInput } from './dto/update-folder.input';

@Injectable()
export class FolderService {
  constructor(private prisma: PrismaService) {}
  async create(createFolderInput: CreateFolderInput, user: any) {
    const folder = await this.prisma.folder.findFirst({
      where: {
        name: createFolderInput.name,
        authorId: user.uid,
      },
    });
    if (folder) {
      throw new ForbiddenException('This folder already exists');
    }
    return await this.prisma.folder.create({
      data: {
        name: createFolderInput.name,
        authorId: user.uid,
      },
    });
  }

  async findAll(user: any) {
    return await this.prisma.folder.findMany({
      where: {
        authorId: user.uid,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} folder`;
  }

  update(id: number, updateFolderInput: UpdateFolderInput) {
    return `This action updates a #${id} folder`;
  }

  remove(id: number) {
    return `This action removes a #${id} folder`;
  }
}
