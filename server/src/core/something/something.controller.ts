import { Controller } from '@nestjs/common';
import { Something, Tag } from 'src/repository/entities/something';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { SomethingService, TagService } from './something.service';

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
    }
})
@Controller('tag')
export class TagController {
    constructor(private service: TagService) {
    }
}
