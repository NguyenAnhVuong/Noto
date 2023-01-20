import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateNoteInput {
  @Field(() => Int)
  folderId: number;
  @Field(() => String)
  content: string;
}
