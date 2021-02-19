import { Injectable } from '@nestjs/common';

import { Purchase } from '@backend/data';

const fakePurchases: Purchase[] = [
  {
    id: 1,
    purchasedProductIds: [1, 2],
    purchasedAt: new Date(Date.now()),
    storeId: 1,
    userId: 1,
  },
  {
    id: 2,
    purchasedProductIds: [1, 2],
    purchasedAt: new Date(Date.now()),
    storeId: 2,
    userId: 2,
  },
];

@Injectable()
export class PurchaseService {
  getPurchases(): Purchase[] {
    //would do a database call here?
    return fakePurchases;
  }

  getPurchaseById(id: string): Purchase {
    const idAsNumber = Number(id);
    const search: Purchase = fakePurchases.find(
      (purchase: Purchase): boolean => purchase.id === idAsNumber
    );
    return search;
  }
}
