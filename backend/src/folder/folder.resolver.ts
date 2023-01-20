import { NoteService } from './../note/note.service';
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorator/user.decorator';
import { FirebaseAuthGuard } from 'src/auth/guard/firebase-auth.guard';
import { CreateFolderInput } from './dto/create-folder.input';
import { UpdateFolderInput } from './dto/update-folder.input';
import { Folder } from './entities/folder.entity';
import { FolderService } from './folder.service';
import { Note } from 'src/note/entities/note.entity';
@UseGuards(FirebaseAuthGuard)
@Resolver(() => Folder)
export class FolderResolver {
  constructor(
    private readonly folderService: FolderService,
    private readonly noteService: NoteService,
  ) {}

  @Mutation(() => Folder)
  createFolder(
    @Args('createFolderInput') createFolderInput: CreateFolderInput,
    @CurrentUser() user: any,
  ) {
    return this.folderService.create(createFolderInput, user);
  }

  @Query(() => [Folder], { name: 'folders' })
  findAll(@CurrentUser() user: any) {
    return this.folderService.findAll(user);
  }

  @UseGuards(FirebaseAuthGuard)
  @Query(() => Folder, { name: 'folder' })
  findOne(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: any,
  ) {
    return this.folderService.findOne(id, user.uid);
  }

  @ResolveField('notes', () => [Note])
  async getNotes(@Parent() folder: Folder) {
    const { id } = folder;
    return this.noteService.findAll(id);
  }

  @Mutation(() => Folder)
  updateFolder(
    @Args('updateFolderInput') updateFolderInput: UpdateFolderInput,
    @CurrentUser() user: any,
  ) {
    return this.folderService.update(
      updateFolderInput.id,
      updateFolderInput,
      user.uid,
    );
  }

  @Mutation(() => Folder)
  removeFolder(@Args('id', { type: () => Int }) id: number) {
    return this.folderService.remove(id);
  }
}
