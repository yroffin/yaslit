import { Module } from '@nestjs/common';
import { SomethingController } from './something/something.controller';
import { SomethingService } from './something/something.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Something } from 'src/repository/entities/something';

@Module({
  imports: [TypeOrmModule.forFeature([Something])],
  providers: [SomethingService],
  controllers: [SomethingController]
})
export class CoreModule {}
