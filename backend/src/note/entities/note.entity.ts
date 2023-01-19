import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Note {
  @Field(() => Int)
  id: number;
  @Field(() => String)
  content: string;
  @Field(() => Date)
  createdAt: Date;
  @Field(() => Date)
  updatedAt: Date;
}
