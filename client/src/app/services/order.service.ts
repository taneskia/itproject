import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UtilitiesService } from '../helpers/utilities.service';
import { Order, OrderState } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orders: Order[] = [
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
        ]
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
        ]
    }
  ];

  constructor(private http: HttpClient, private utils: UtilitiesService) { }

  getOrders() {
    return this.orders;
  }

  addOrder(order: Order) {
    order.ID = this.orders[this.orders.length - 1].ID + 1;
    this.orders.push(order);

    // TODO: Connect Order to backend

    return this.http
      .post(this.utils.getBuyerApi('buy'), JSON.stringify(order.ProductOrder))
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => {
          return throwError(err);
        })
      );
  }
}
