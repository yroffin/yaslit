import { Resolver, Query } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Node, Tag } from '../entities/node';

@Resolver('Graphql')
export class NodeResolver {

    constructor(
        @InjectRepository(Node) private node,
        @InjectRepository(Tag) private tag
    ) {

    }

    @Query(() => [Node])
    async nodes(): Promise<Node[]> {
        return await this.node.find();
    }

    @Query(() => [Tag])
    async tags(): Promise<Tag[]> {
        return await this.tag.find();
    }
}
