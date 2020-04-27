import { Controller } from '@nestjs/common';
import { Something } from 'src/repository/entities/something';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { SomethingService } from './something.service';

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
