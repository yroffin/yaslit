import { Module } from '@nestjs/common';
import { SomethingController, TagController, FolderController } from './something/something.controller';
import { SomethingService, TagService, FolderService } from './something/something.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Something, Tag, Folder } from 'src/repository/entities/something';

@Module({
  imports: [TypeOrmModule.forFeature([Something, Tag, Folder])],
  providers: [SomethingService, TagService, FolderService],
  controllers: [SomethingController, TagController, FolderController]
})
export class CoreModule {}
