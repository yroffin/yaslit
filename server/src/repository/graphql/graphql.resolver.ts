import { Resolver, Query } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Something } from '../entities/something';

@Resolver('Graphql')
export class SomethingResolver {

    constructor(
        @InjectRepository(Something) private something,
    ) {

    }

    @Query(() => [Something])
    async somethings(): Promise<Something[]> {
        return await this.something.find();
    }
}
