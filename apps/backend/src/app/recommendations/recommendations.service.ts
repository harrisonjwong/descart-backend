import { Injectable } from '@nestjs/common';
import { PersonalizeRuntime } from "aws-sdk";

const REGION = 'us-east-2';
const CAMPAIGN_ARN = 'arn:aws:personalize:us-east-2:815160866095:campaign/descart-basic'
// SET AWS_ACCESS_KEY_ID AND AWS_SECRET_ACCESS_KEY AS ENVIRONMENT VARIABLES

@Injectable()
export class RecommendationsService {
  NUM_RECS: number;
  client: PersonalizeRuntime;

  constructor() {
    this.NUM_RECS = 100;
    this.client = new PersonalizeRuntime({
      region: REGION,
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_KEY});
  }

  getRecommendationProductIds(userId: string): number[] {
    const nums: Set<number> = new Set();
    this.client.getRecommendations({
      campaignArn: CAMPAIGN_ARN, 
      userId: userId,
      numResults: this.NUM_RECS}, 
      function(err, data) {
        for (var i = 0; i < data.itemList.length; i++) {
          nums.add(Number(data.itemList[i].itemId));
        }
    })
    return [...nums];
  }
}