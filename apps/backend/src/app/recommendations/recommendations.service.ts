import { Injectable } from '@nestjs/common';
import axios from 'axios';

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

  async getRecommendationsFromAmazon() {
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

    const amazonResult = await axios.post('/recommendations', body);

    // do some data transformation to turn the result from amazon into a list of number (product ids)

    return amazonResult;
  }

  getRecommendationProductIdsTest(): number[] {
    return [...Array(this.NUM_RECS).keys()];
  }
}
