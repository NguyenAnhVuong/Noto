import { Module } from '@nestjs/common';
import { FolderService } from './folder.service';
import { FolderResolver } from './folder.resolver';

@Module({
  providers: [FolderResolver, FolderService],
})
export class FolderModule {}
