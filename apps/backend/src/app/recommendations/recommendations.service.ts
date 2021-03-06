import { Injectable } from '@nestjs/common';
import { PersonalizeRuntime } from "aws-sdk";

@Injectable()
export class RecommendationsService {
  NUM_RECS: number;
  TOTAL_PRODUCTS: number;
  private client: PersonalizeRuntime;

  constructor() {
    this.NUM_RECS = 100;
    this.TOTAL_PRODUCTS = 8000;
    this.client = new PersonalizeRuntime();
  }
  getRecommendationProductIds(): number[] {
    const nums: Set<number> = new Set();
    while (nums.size <= this.NUM_RECS) {
      nums.add(Math.floor(Math.random() * this.TOTAL_PRODUCTS) + 1);
    }
    return [...nums];
  }

  getRecommendationProductIdsTest(): number[] {
    return [...Array(this.NUM_RECS).keys()];
  }
}



