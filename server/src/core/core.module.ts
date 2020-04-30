import { Module } from '@nestjs/common';
import { NodeController, TagController, FolderController, EdgeController } from './node/node.controller';
import { NodeService, TagService, FolderService, EdgeService } from './node/node.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Node, Tag, Folder, Edge } from 'src/repository/entities/node';

@Module({
  imports: [TypeOrmModule.forFeature([Node, Edge, Tag, Folder])],
  providers: [NodeService, EdgeService, TagService, FolderService],
  controllers: [NodeController, EdgeController, TagController, FolderController]
})
export class CoreModule {}
