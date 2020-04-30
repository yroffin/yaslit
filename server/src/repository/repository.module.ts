import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Node, Tag, Folder, Edge } from './entities/node';
import { NodeResolver } from './graphql/graphql.resolver';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: '.test.sqlite',
            entities: [Node, Edge, Tag, Folder],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([Node, Edge, Tag, Folder]),
        GraphQLModule.forRoot({
            autoSchemaFile: 'schema.gql'
        })],
    exports: [
    ],
    providers: [
        NodeResolver
    ]
})
export class RepositoryModule {
}
