import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';

@Injectable()
export class NoteService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createNoteInput: CreateNoteInput) {
    return await this.prisma.note.create({
      data: {
        ...createNoteInput,
      },
    });
  }

  async findAll(folderId: number) {
    return await this.prisma.note.findMany({
      where: {
        folderId,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.note.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateNoteInput: UpdateNoteInput) {
    return await this.prisma.note.update({
      where: {
        id,
      },
      data: {
        content: updateNoteInput.content,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.note.delete({
      where: {
        id,
      },
    });
  }
}
