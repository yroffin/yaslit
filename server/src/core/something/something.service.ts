import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Something, Tag, Folder } from 'src/repository/entities/something';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SomethingService extends TypeOrmCrudService<Something> {
    constructor(@InjectRepository(Something) repo) {
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
