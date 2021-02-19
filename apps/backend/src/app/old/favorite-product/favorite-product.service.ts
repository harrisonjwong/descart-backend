import { Injectable } from '@nestjs/common';

import { FavoriteProduct } from '@backend/data';

const fakeFavoriteProducts: FavoriteProduct[] = [
  {
    id: 1,
    productId: 1,
    userId: 1,
  },
  {
    id: 2,
    productId: 2,
    userId: 1,
  },
];

@Injectable()
export class FavoriteProductService {
  getFavoriteProducts(): FavoriteProduct[] {
    //would do a database call here?
    return fakeFavoriteProducts;
  }

  getFavoriteProductById(id: string): FavoriteProduct {
    const idAsNumber = Number(id);
    const search: FavoriteProduct = fakeFavoriteProducts.find(
      (favoriteProduct: FavoriteProduct): boolean =>
        favoriteProduct.id === idAsNumber
    );
    return search;
  }

  getAllFavoritesByUserId(id: string): FavoriteProduct[] {
    const idAsNumber = Number(id);
    const filteredFavorites: FavoriteProduct[] = fakeFavoriteProducts.filter(
      (favoriteProduct: FavoriteProduct): boolean =>
        favoriteProduct.userId === idAsNumber
    );
    return filteredFavorites;
  }
}
