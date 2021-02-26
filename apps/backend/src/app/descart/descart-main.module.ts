import { Module } from '@nestjs/common';
import { DescartModule } from './descart.module';
import { DescartService } from './descart.service';
import { DescartController } from './descart.controller';
import { RecommendationsService } from '../recommendations/recommendations.service';

@Module({
  imports: [DescartModule],
  providers: [DescartService, RecommendationsService],
  controllers: [DescartController],
})
export class DescartMainModule {}
