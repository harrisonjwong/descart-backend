import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AmazonItemRecommendationDto } from './dto/amazon.item.recommendation.dto';
import { AmazonRecommendationsDto } from './dto/amazon.recommendations.dto';

@Injectable()
export class RecommendationsService {
  NUM_RECS: number;
  TOTAL_PRODUCTS: number;
  constructor() {
    this.NUM_RECS = 100;
    this.TOTAL_PRODUCTS = 8000;
  }
  getRecommendationProductIds(): number[] {
    const nums: Set<number> = new Set();
    while (nums.size <= this.NUM_RECS) {
      nums.add(Math.floor(Math.random() * this.TOTAL_PRODUCTS) + 1);
    }
    return [...nums];
  }

  async getRecommendationsFromAmazon(): Promise<number[]> {
    const body = {
      campaignArn: 'hello',
      context: {
        string: 'string',
      },
      filterArm: 'string',
      filterValues: {
        string: 'string',
      },
      itemId: 'string',
      numResults: 'number',
      userId: 'number',
    };

    const amazonResult: AmazonRecommendationsDto = await axios.post(
      '/recommendations',
      body
    );

    // do some data transformation to turn the result from amazon into what we want
    const recommendationsList: AmazonItemRecommendationDto[] =
      amazonResult.itemList;
    recommendationsList.sort((a, b) => a.score - b.score);

    //potentially unsafe transformation since itemId is a string
    const sortedItemIds: number[] = recommendationsList.map((item) =>
      Number(item.itemId)
    );

    return sortedItemIds;
  }

  getRecommendationProductIdsTest(): number[] {
    return [...Array(this.NUM_RECS).keys()];
  }
}
