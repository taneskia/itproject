import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilitiesService } from '../helpers/utilities.service';
import { Order, OrderState } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class FreelancerService {
  acceptingOrders: Order[] = [];
  acceptedOrders: Order[] = [];

  constructor(private http: HttpClient, private utils: UtilitiesService) {}

  public async getOrders(): Promise<Order[]> {
    await this.getOrdersFromDB().then((res: Order[]) => this.acceptingOrders = res);
    return this.acceptingOrders;
  }

  public async getAcceptedOrders(): Promise<Order[]> {
    await this.getAcceptedOrdersFromDB().then((res: Order[]) => this.acceptedOrders = res);
    return this.acceptedOrders;
  }

  private async getOrdersFromDB(): Promise<any> {
    const res = await this.http.get(this.utils.getFreelancerApi('pending-orders')).toPromise();
    return res;
  }

  private async getAcceptedOrdersFromDB(): Promise<any> {
    const res = await this.http.get(this.utils.getFreelancerApi('accepted-orders')).toPromise();
    return res;
  }
}
