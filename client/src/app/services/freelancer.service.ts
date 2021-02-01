import { Injectable } from '@angular/core';
import { Order, OrderState } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class FreelancerService {
  acceptingOrders: Order[] = [
    {
      ID: 1,
      OrderState: OrderState.Ordered,
      ProductOrder: [
        {
          id: 3,
          name: 'Oranges',
          price: 1.87,
          amount: 1,
          image:
            'https://produits.bienmanger.com/38345-0w470h470_Organic_Navelate_Oranges.jpg',
        },
        {
          id: 4,
          name: 'Pears',
          price: 1.23,
          amount: 1,
          image:
            'https://specials-images.forbesimg.com/imageserve/5f42b5182138dffac9bf05b7/960x0.jpg',
        },
        {
          id: 5,
          name: 'Peaches',
          price: 1.23,
          amount: 1,
          image: 'https://images.heb.com/is/image/HEBGrocery/000513694',
        },
      ],
      Address: 'Kire Gavriloski 26',
    },
    {
      ID: 2,
      OrderState: OrderState.Ordered,
      ProductOrder: [
        {
          id: 1,
          name: 'Bananas',
          price: 1.23,
          amount: 1,
          image: 'https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG.jpg',
        },
        {
          id: 2,
          name: 'Apples',
          price: 1.5,
          amount: 1,
          image: 'https://www.macdentalcare.com/pub/photo/2014-09-apple.jpg',
        },
        {
          id: 3,
          name: 'Oranges',
          price: 1.87,
          amount: 1,
          image:
            'https://produits.bienmanger.com/38345-0w470h470_Organic_Navelate_Oranges.jpg',
        },
      ],
      Address: 'Mice Kozar 95',
    },
  ];

  acceptedOrders: Order[] = [
    {
      ID: 3,
      OrderState: OrderState.Accepted,
      ProductOrder: [
        {
          id: 3,
          name: 'Oranges',
          price: 1.87,
          amount: 1,
          image:
            'https://produits.bienmanger.com/38345-0w470h470_Organic_Navelate_Oranges.jpg',
        },
        {
          id: 4,
          name: 'Pears',
          price: 1.23,
          amount: 1,
          image:
            'https://specials-images.forbesimg.com/imageserve/5f42b5182138dffac9bf05b7/960x0.jpg',
        },
        {
          id: 5,
          name: 'Peaches',
          price: 1.23,
          amount: 1,
          image: 'https://images.heb.com/is/image/HEBGrocery/000513694',
        },
      ],
      Address: 'Kire Gavriloski 26',
    },
  ];

  constructor() {}

  getOrders() {
    return this.acceptingOrders;
  }

  getAcceptedOrders() {
    return this.acceptedOrders;
  }
}
