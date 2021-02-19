import { Injectable } from '@nestjs/common';

import { Store } from '@backend/data';

const fakeStores: Store[] = [
  {
    id: 1,
    name: 'Costco',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Costco_Wholesale_logo_2010-10-26.svg/220px-Costco_Wholesale_logo_2010-10-26.svg.png',
    websiteUrl: 'https://costco.com',
  },
  {
    id: 2,
    name: 'Whole Foods',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Whole_Foods_Market_201x_logo.svg/220px-Whole_Foods_Market_201x_logo.svg.png',
    websiteUrl: 'https://wholefoods.com',
  },
];

@Injectable()
export class StoreService {
  getStores(): Store[] {
    //would do a database call here?
    return fakeStores;
  }

  getStoreById(id: string): Store {
    const idAsNumber = Number(id);
    const search: Store = fakeStores.find(
      (store: Store): boolean => store.id === idAsNumber
    );
    return search;
  }

  getStoreByName(searchTerm: string): Store[] {
    const searchedStores: Store[] = fakeStores.filter((store: Store): boolean =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return searchedStores;
  }
}
