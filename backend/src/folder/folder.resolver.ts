import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorator/user.decorator';
import { FirebaseAuthGuard } from 'src/auth/guard/firebase-auth.guard';
import { CreateFolderInput } from './dto/create-folder.input';
import { UpdateFolderInput } from './dto/update-folder.input';
import { Folder } from './entities/folder.entity';
import { FolderService } from './folder.service';

@Resolver(() => Folder)
export class FolderResolver {
  constructor(private readonly folderService: FolderService) {}

  @UseGuards(FirebaseAuthGuard)
  @Mutation(() => Folder)
  createFolder(
    @Args('createFolderInput') createFolderInput: CreateFolderInput,
    @CurrentUser() user: any,
  ) {
    return this.folderService.create(createFolderInput, user);
  }

  @UseGuards(FirebaseAuthGuard)
  @Query(() => [Folder], { name: 'folders' })
  findAll(@CurrentUser() user: any) {
    return this.folderService.findAll(user);
  }

  @Query(() => Folder, { name: 'folder' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.folderService.findOne(id);
  }

  @Mutation(() => Folder)
  updateFolder(
    @Args('updateFolderInput') updateFolderInput: UpdateFolderInput,
  ) {
    return this.folderService.update(updateFolderInput.id, updateFolderInput);
  }

  @Mutation(() => Folder)
  removeFolder(@Args('id', { type: () => Int }) id: number) {
    return this.folderService.remove(id);
  }
}
