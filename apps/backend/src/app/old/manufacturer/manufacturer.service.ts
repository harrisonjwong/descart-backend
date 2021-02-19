import { Injectable } from '@nestjs/common';

import { Manufacturer } from '@backend/data';

const fakeManufacturers: Manufacturer[] = [
  {
    id: 1,
    name: 'Nike',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/200px-Logo_NIKE.svg.png',
    websiteUrl: 'https://nike.com',
  },
  {
    id: 2,
    name: 'Amazon',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/175px-Amazon_logo.svg.png',
    websiteUrl: 'https://amazon.com',
  },
];

@Injectable()
export class ManufacturerService {
  getManufacturers(): Manufacturer[] {
    //would do a database call here?
    return fakeManufacturers;
  }

  getManufacturerById(id: string): Manufacturer {
    const idAsNumber = Number(id);
    const search: Manufacturer = fakeManufacturers.find(
      (manufacturer: Manufacturer): boolean => manufacturer.id === idAsNumber
    );
    return search;
  }
}
