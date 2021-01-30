import { Injectable } from '@angular/core';
import { Order, OrderState } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class FreelancerService {

  acceptingOrders: Order[] = [
    {
      ID: 1,
      OrderState: OrderState.Ordered,
      ProductOrder: [
          {
            ID: 3,
            Name: 'Oranges',
            Price: 1.87,
            Amount: 1,
            Image:
              'https://produits.bienmanger.com/38345-0w470h470_Organic_Navelate_Oranges.jpg',
          },
          {
            ID: 4,
            Name: 'Pears',
            Price: 1.23,
            Amount: 1,
            Image:
              'https://specials-images.forbesimg.com/imageserve/5f42b5182138dffac9bf05b7/960x0.jpg',
          },
          {
            ID: 5,
            Name: 'Peaches',
            Price: 1.23,
            Amount: 1,
            Image: 'https://images.heb.com/is/image/HEBGrocery/000513694',
          }
        ],
        Address: 'Kire Gavriloski 26'
    },
    {
      ID: 2,
      OrderState: OrderState.Ordered,
      ProductOrder: [
          {
            ID: 1,
            Name: 'Bananas',
            Price: 1.23,
            Amount: 1,
            Image: 'https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG.jpg',
          },
          {
            ID: 2,
            Name: 'Apples',
            Price: 1.5,
            Amount: 1,
            Image: 'https://www.macdentalcare.com/pub/photo/2014-09-apple.jpg',
          },
          {
            ID: 3,
            Name: 'Oranges',
            Price: 1.87,
            Amount: 1,
            Image:
              'https://produits.bienmanger.com/38345-0w470h470_Organic_Navelate_Oranges.jpg',
          }
        ],
        Address: 'Mice Kozar 95',
    }
  ];

  acceptedOrders: Order[] = [
    {
      ID: 3,
      OrderState: OrderState.Accepted,
      ProductOrder: [
          {
            ID: 3,
            Name: 'Oranges',
            Price: 1.87,
            Amount: 1,
            Image:
              'https://produits.bienmanger.com/38345-0w470h470_Organic_Navelate_Oranges.jpg',
          },
          {
            ID: 4,
            Name: 'Pears',
            Price: 1.23,
            Amount: 1,
            Image:
              'https://specials-images.forbesimg.com/imageserve/5f42b5182138dffac9bf05b7/960x0.jpg',
          },
          {
            ID: 5,
            Name: 'Peaches',
            Price: 1.23,
            Amount: 1,
            Image: 'https://images.heb.com/is/image/HEBGrocery/000513694',
          }
        ],
        Address: 'Kire Gavriloski 26',
    }
  ];

  constructor() { }

  getOrders() {
    return this.acceptingOrders;
  }

  getAcceptedOrders() {
    return this.acceptedOrders;
  }
}
