import { Module } from '@nestjs/common';
import { SomethingController, TagController } from './something/something.controller';
import { SomethingService, TagService } from './something/something.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Something, Tag } from 'src/repository/entities/something';

@Module({
  imports: [TypeOrmModule.forFeature([Something, Tag])],
  providers: [SomethingService, TagService],
  controllers: [SomethingController, TagController]
})
export class CoreModule {}
