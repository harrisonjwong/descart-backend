import { AmazonItemRecommendationDto } from './amazon.item.recommendation.dto';

export class AmazonRecommendationsDto {
  itemList: AmazonItemRecommendationDto[];
  recommendationId: string;
}
