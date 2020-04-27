import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Something, Tag } from './entities/something';
import { SomethingResolver } from './graphql/graphql.resolver';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: '.test.sqlite',
            entities: [Something, Tag],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([Something, Tag]),
        GraphQLModule.forRoot({
            autoSchemaFile: 'schema.gql'
        })],
    exports: [
    ],
    providers: [
        SomethingResolver
    ]
})
export class RepositoryModule {
}
