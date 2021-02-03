import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UtilitiesService } from '../helpers/utilities.service';
import { Order, OrderState } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orders: Order[] = [
    {
      orderID: 1,
      orderState: OrderState.Ordered,
      products: [
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
        {
          id: 4,
          name: 'Pears',
          price: 1.23,
          amount: 1,
          image:
            'https://specials-images.forbesimg.com/imageserve/5f42b5182138dffac9bf05b7/960x0.jpg',
        },
      ],
      address: 'Partizanski Odredi 7',
    },
    {
      orderID: 2,
      orderState: OrderState.Ordered,
      products: [
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
      address: 'Boris Kidrich 102',
    },
  ];

  constructor(private http: HttpClient, private utils: UtilitiesService) {}

  getOrders() {
    return this.orders;
  }

  addOrder(order: Order): Promise<any> {
    order.orderID = this.orders[this.orders.length - 1].orderID + 1;
    this.orders.push(order);
    const response = this.http
      .post(this.utils.getBuyerApi('buy'), JSON.stringify(order.products))
      .toPromise();

    return response;
  }
}
