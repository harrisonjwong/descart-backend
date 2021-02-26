import { Injectable } from '@nestjs/common';

@Injectable()
export class RecommendationsService {
  NUM_RECS: number;
  TOTAL_PRODUCTS: number;
  constructor() {
    this.NUM_RECS = 50;
    this.TOTAL_PRODUCTS = 1000;
  }
  getRecommendationProductIds(): number[] {
    const nums: Set<number> = new Set();
    while (nums.size <= this.NUM_RECS) {
      nums.add(Math.floor(Math.random() * this.TOTAL_PRODUCTS) + 1);
    }
    return [...nums];
  }

  getRecommendationProductIdsTest(): number[] {
    return [...Array(50).keys()];
  }
}
