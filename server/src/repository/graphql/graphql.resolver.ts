import { Resolver, Query } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Something, Tag } from '../entities/something';

@Resolver('Graphql')
export class SomethingResolver {

    constructor(
        @InjectRepository(Something) private something,
        @InjectRepository(Tag) private tag
    ) {

    }

    @Query(() => [Something])
    async somethings(): Promise<Something[]> {
        return await this.something.find();
    }

    @Query(() => [Tag])
    async tags(): Promise<Tag[]> {
        return await this.tag.find();
    }
}
