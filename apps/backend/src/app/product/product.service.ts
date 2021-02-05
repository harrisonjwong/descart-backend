import { Injectable } from '@nestjs/common';

import { Product } from '@backend/data';

const fakeProducts: Product[] = [
  {
    id: 1,
    name: 'Bread',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Korb_mit_Br%C3%B6tchen.JPG/1024px-Korb_mit_Br%C3%B6tchen.JPG',
    manufacturerId: 3,
  },
  {
    id: 2,
    name: 'Pasta',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/%28Pasta%29_by_David_Adam_Kess_%28pic.2%29.jpg/1024px-%28Pasta%29_by_David_Adam_Kess_%28pic.2%29.jpg',
    manufacturerId: 8,
  },
];

@Injectable()
export class ProductService {
  getProducts(): Product[] {
    //would do a database call here?
    return fakeProducts;
  }

  getProductById(id: string): Product {
    const idAsNumber = Number(id);
    const searchedProduct: Product = fakeProducts.find(
      (product: Product): boolean => product.id === idAsNumber
    );
    return searchedProduct;
  }

  getProductByName(searchTerm: string): Product[] {
    const searchedProducts: Product[] = fakeProducts.filter(
      (product: Product): boolean =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return searchedProducts;
  }
}
