import { Controller } from '@nestjs/common';
import { Something, Tag, Folder } from 'src/repository/entities/something';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { SomethingService, TagService, FolderService } from './something.service';

@ApiTags('folder')
@Crud({
    model: {
        type: Folder
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    },
    query: {
        join: {
            somethings: { eager: true }
        }
    }
})
    @Controller('folder')
export class FolderController {
    constructor(private service: FolderService) {
    }
}

@ApiTags('something')
@Crud({
    model: {
        type: Something
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    },
    query: {
        join: {
            tags: { eager: true }
        }
    }
})
@Controller('something')
export class SomethingController {
    constructor(private service: SomethingService) {
    }
}

@ApiTags('tag')
@Crud({
    model: {
        type: Tag
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    },
    query: {
        join: {
            somethings: { eager: true }
        }
    }
})
@Controller('tag')
export class TagController {
    constructor(private service: TagService) {
    }
}
