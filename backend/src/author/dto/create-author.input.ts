import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAuthorInput {
  @Field(() => String)
  uid: string;
  @Field(() => String)
  name: string;
}
