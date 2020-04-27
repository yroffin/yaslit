import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SomethingResolver } from './repository/graphql/graphql.resolver';
import { CoreModule } from './core/core.module';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [RepositoryModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
