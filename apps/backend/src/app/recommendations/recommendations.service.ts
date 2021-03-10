import { Injectable } from '@nestjs/common';
import { PersonalizeRuntime } from "aws-sdk";

const REGION = 'us-east-2';
// put these variables in a file somewhere else or set as environmental variables when deployed
const ACCESS_KEY = 'AKIA33S27WUXQ2JIL2V7'
const SECRET_KEY = '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'
const CAMPAIGN_ARN = 'arn:aws:personalize:us-east-2:815160866095:campaign/descart-basic'


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
          nums.add(parseInt(data.itemList[i].itemId));
        }
    })
    return [...nums];
  }
}