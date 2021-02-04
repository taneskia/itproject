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
  orders: Order[] = [];

  constructor(private http: HttpClient, private utils: UtilitiesService) {}

  public async getOrders(): Promise<any> {
    const res = await this.http.get(this.utils.getBuyerApi('my-orders')).toPromise();
    return res;
  }

  async addOrder(order: Order): Promise<any> {
    //order.orderID = this.orders[this.orders.length - 1].orderID + 1;
    const response = await this.http
      .post(this.utils.getBuyerApi('buy'), JSON.stringify(order.products))
      .toPromise();
    return response;
  }
}
