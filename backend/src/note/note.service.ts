import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';

@Injectable()
export class NoteService {
  constructor(private readonly prisma: PrismaService) {}
  create(createNoteInput: CreateNoteInput) {
    return 'This action adds a new note';
  }

  async findAll(folderId: number) {
    return await this.prisma.note.findMany({
      where: {
        folderId,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} note`;
  }

  update(id: number, updateNoteInput: UpdateNoteInput) {
    return `This action updates a #${id} note`;
  }

  remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
