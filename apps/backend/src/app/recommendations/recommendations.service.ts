import { Injectable } from '@nestjs/common';
import { PersonalizeEvents, PersonalizeRuntime } from 'aws-sdk';
import { NumberList } from 'aws-sdk/clients/iot';
import { EventListenerTypes } from 'typeorm/metadata/types/EventListenerTypes';

const REGION = 'us-east-2';
const CAMPAIGN_ARN = 'arn:aws:personalize:us-east-2:815160866095:campaign/descart-50-user'
const TRACKING_ID = '05e88d1b-b68b-4cf9-9cc1-9816fe8ad046';

@Injectable()
export class RecommendationsService {
  NUM_RECS: number;
  recommendation_client: PersonalizeRuntime;
  event_client: PersonalizeEvents;

  constructor() {
    this.NUM_RECS = 100;
    this.recommendation_client = new PersonalizeRuntime({
      region: REGION,
    });
    this.event_client = new PersonalizeEvents({
      region: REGION
    });
  }

  async getRecommendationProductIds(userId: string): Promise<number[]> {
    const nums: Set<number> = new Set();
    return this.recommendation_client
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
        // console.log([...nums]);
        return [...nums];
      });
  }

  async addPurchase(userId: string, itemIds: number[], timestamp: number) {
    var eventList = new Array()
    for (var i = 0; i < itemIds.length; i++) {
      var itemId = {
        itemId: itemIds[i].toString()
      }
      var purchase = {
        sentAt: timestamp,
        eventType: 'purchase',
        properties: itemId
      }
      eventList.push(purchase)
    }

    this.event_client.putEvents({
      userId: userId,
      trackingId: TRACKING_ID,
      eventList: eventList,
      sessionId: userId
    },
    (err, data) => {
      console.log(data)
    })
  }
}
