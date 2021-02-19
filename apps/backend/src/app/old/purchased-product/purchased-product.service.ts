import { Injectable } from '@nestjs/common';

import { PurchasedProduct } from '@backend/data';

const fakePurchasedProducts: PurchasedProduct[] = [
  {
    id: 1,
    productId: 1,
    storeId: 1,
    price: 3.01,
    lastPurchase: new Date(Date.now()),
  },
  {
    id: 1,
    productId: 2,
    storeId: 1,
    price: 5.99,
    lastPurchase: new Date(Date.now()),
  },
];

@Injectable()
export class PurchasedProductService {
  getPurchasedProducts(): PurchasedProduct[] {
    //would do a database call here?
    return fakePurchasedProducts;
  }

  getPurchasedProductById(id: string): PurchasedProduct {
    const idAsNumber = Number(id);
    const search: PurchasedProduct = fakePurchasedProducts.find(
      (pp: PurchasedProduct): boolean => pp.id === idAsNumber
    );
    return search;
  }
}
