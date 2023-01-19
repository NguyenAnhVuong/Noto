import { ObjectType, Field } from '@nestjs/graphql';
import { Folder } from 'src/folder/entities/folder.entity';

@ObjectType()
export class Author {
  @Field(() => String)
  uid: string;
  @Field(() => String)
  name: string;
  @Field(() => Date)
  createdAt: Date;
  @Field(() => Date)
  updatedAt: Date;
  @Field(() => Folder, { nullable: true })
  Folder?: Folder;
}
