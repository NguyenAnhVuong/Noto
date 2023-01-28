import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteResolver } from './note.resolver';

@Module({
  providers: [NoteResolver, NoteService],
  exports: [NoteService],
})
export class NoteModule {}
