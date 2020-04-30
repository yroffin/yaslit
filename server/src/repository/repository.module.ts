import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Node, Tag, Folder } from './entities/node';
import { NodeResolver } from './graphql/graphql.resolver';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: '.test.sqlite',
            entities: [Node, Tag, Folder],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([Node, Tag, Folder]),
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
