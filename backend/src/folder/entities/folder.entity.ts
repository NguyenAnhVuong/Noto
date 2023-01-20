import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Author } from 'src/author/entities/author.entity';
import { Note } from 'src/note/entities/note.entity';

@ObjectType()
export class Folder {
  @Field(() => Int)
  id: number;
  @Field(() => String)
  name: string;
  @Field(() => Date)
  createdAt: Date;
  @Field(() => Date)
  updatedAt: Date;
  @Field(() => Author)
  author: Author;
  @Field(() => [Note], { nullable: true })
  notes?: Note[];
}
