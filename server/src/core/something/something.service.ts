import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Something } from 'src/repository/entities/something';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SomethingService extends TypeOrmCrudService<Something> {
    constructor(@InjectRepository(Something) repo) {
        super(repo);
    }
}
