import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Node, Tag, Folder } from 'src/repository/entities/node';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NodeService extends TypeOrmCrudService<Node> {
    constructor(@InjectRepository(Node) repo) {
        super(repo);
    }
}

@Injectable()
export class TagService extends TypeOrmCrudService<Tag> {
    constructor(@InjectRepository(Tag) repo) {
        super(repo);
    }
}

@Injectable()
export class FolderService extends TypeOrmCrudService<Folder> {
    constructor(@InjectRepository(Tag) repo) {
        super(repo);
    }
}
