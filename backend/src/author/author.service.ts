import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}
  async create(createAuthorInput: CreateAuthorInput): Promise<Author> {
    const author = await this.prisma.author.findFirst({
      where: {
        uid: createAuthorInput.uid,
      },
    });

    if (author) {
      return author;
    }

    return await this.prisma.author.create({
      data: createAuthorInput,
    });
  }

  findAll() {
    return `This action returns all author`;
  }

  findOne(id: number) {
    return `This action returns a #${id} author`;
  }

  update(id: number, updateAuthorInput: UpdateAuthorInput) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}
