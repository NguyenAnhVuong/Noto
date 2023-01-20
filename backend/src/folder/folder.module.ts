import { NoteService } from './../note/note.service';
import { Module } from '@nestjs/common';
import { NoteModule } from 'src/note/note.module';
import { FolderResolver } from './folder.resolver';
import { FolderService } from './folder.service';

@Module({
  imports: [NoteModule],
  providers: [FolderResolver, FolderService, NoteService],
})
export class FolderModule {}
