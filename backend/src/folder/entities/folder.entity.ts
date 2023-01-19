import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Author } from 'src/author/entities/author.entity';
import { Note } from 'src/note/entities/note.entity';

@ObjectType()
export class Folder {
  @Field(() => Int)
  id: number;
  @Field(() => String)
  name: string;
  @Field(() => String)
  createdAt: string;
  @Field(() => Author)
  author: Author;
  @Field(() => Note, { nullable: true })
  notes?: [Note];
}
