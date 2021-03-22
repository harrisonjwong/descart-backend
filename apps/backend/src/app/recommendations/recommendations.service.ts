import { Injectable } from '@nestjs/common';
import { PersonalizeRuntime } from 'aws-sdk';

const REGION = 'us-east-2';
const CAMPAIGN_ARN =
  'arn:aws:personalize:us-east-2:815160866095:campaign/descart-basic';

@Injectable()
export class RecommendationsService {
  NUM_RECS: number;
  client: PersonalizeRuntime;

  constructor() {
    this.NUM_RECS = 100;
    this.client = new PersonalizeRuntime({
      region: REGION,
    });
  }

  async getRecommendationProductIds(userId: string): Promise<number[]> {
    const nums: Set<number> = new Set();
    return this.client
      .getRecommendations(
        {
          campaignArn: CAMPAIGN_ARN,
          userId: userId.toString(),
          numResults: this.NUM_RECS,
        },
        (err, data) => {
          for (var i = 0; i < data.itemList.length; i++) {
            nums.add(Number(data.itemList[i].itemId));
          }
        }
      )
      .promise()
      .then(() => {
        return [...nums];
      });
  }

  addPurchase() {}
}
