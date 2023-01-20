import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';
import { Note } from './entities/note.entity';
import { NoteService } from './note.service';

@Resolver(() => Note)
export class NoteResolver {
  constructor(private readonly noteService: NoteService) {}

  @Mutation(() => Note)
  createNote(@Args('createNoteInput') createNoteInput: CreateNoteInput) {
    return this.noteService.create(createNoteInput);
  }

  @Query(() => Note, { name: 'note' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.noteService.findOne(id);
  }

  @Mutation(() => Note)
  updateNote(@Args('updateNoteInput') updateNoteInput: UpdateNoteInput) {
    return this.noteService.update(updateNoteInput.id, updateNoteInput);
  }

  @Mutation(() => Note)
  removeNote(@Args('id', { type: () => Int }) id: number) {
    return this.noteService.remove(id);
  }
}
