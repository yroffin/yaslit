import { Module } from '@nestjs/common';
import { NodeController, TagController, FolderController } from './node/node.controller';
import { NodeService, TagService, FolderService } from './node/node.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Node, Tag, Folder } from 'src/repository/entities/node';

@Module({
  imports: [TypeOrmModule.forFeature([Node, Tag, Folder])],
  providers: [NodeService, TagService, FolderService],
  controllers: [NodeController, TagController, FolderController]
})
export class CoreModule {}
