import { Module } from '@nestjs/common';
import { DescartModule } from './descart.module';
import { DescartService } from './descart.service';
import { DescartController } from './descart.controller';

@Module({
  imports: [DescartModule],
  providers: [DescartService],
  controllers: [DescartController],
})
export class DescartMainModule {}
