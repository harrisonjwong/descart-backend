export type Receipt = {
  message: string;
  date: string;
};
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  manufacturerId: number;
}

export interface PurchasedProduct {
  id: number;
  productId: number;
  storeId: number;
  price: number;
  lastPurchase: Date;
}

export interface Store {
  id: number;
  name: string;
  imageUrl: string;
  websiteUrl: string;
}

export interface Manufacturer {
  id: number;
  name: string;
  imageUrl: string;
  websiteUrl: string;
}

export interface FavoriteProduct {
  id: number;
  productId: number;
  userId: number;
}

export interface Purchase {
  id: number;
  purchasedProductIds: number[];
  purchasedAt: Date;
  storeId: number;
  userId: number;
}
