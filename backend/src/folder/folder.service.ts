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
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  async findOne(id: number, userId: string) {
    return await this.prisma.folder.findFirst({
      where: {
        id,
        authorId: userId,
      },
    });
  }

  async update(
    id: number,
    updateFolderInput: UpdateFolderInput,
    authorId: string,
  ) {
    const folder = await this.prisma.folder.findFirst({
      where: {
        name: updateFolderInput.name,
        authorId,
      },
    });
    if (folder) {
      throw new ForbiddenException('This folder already exists');
    }
    return await this.prisma.folder.update({
      where: {
        id,
      },
      data: {
        name: updateFolderInput.name,
      },
    });
  }

  async remove(id: number) {
    await this.prisma.note.deleteMany({
      where: {
        folderId: id,
      },
    });
    return await this.prisma.folder.delete({
      where: {
        id,
      },
    });
  }
}
