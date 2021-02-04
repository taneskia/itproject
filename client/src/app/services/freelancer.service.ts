import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilitiesService } from '../helpers/utilities.service';
import { Order, OrderState } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class FreelancerService {
  pendingOrders: Order[] = [];
  acceptedOrders: Order[] = [];

  constructor(private http: HttpClient, private utils: UtilitiesService) {}

  public async getOrders(): Promise<Order[]> {
    await this.getOrdersFromDB().then((res: Order[]) => this.pendingOrders = res);
    return this.pendingOrders;
  }

  public async getAcceptedOrders(): Promise<Order[]> {
    await this.getAcceptedOrdersFromDB().then((res: Order[]) => this.acceptedOrders = res);
    return this.acceptedOrders;
  }

  public async acceptOrder(order: Order): Promise<any> {
    const res = await this.http.post(this.utils.getFreelancerApi('accept-order'), JSON.stringify(order)).toPromise();
    return res;
  }

  public async updateOrderState(order: Order): Promise<any> {
    const res = await this.http.post(this.utils.getFreelancerApi('update-orderState'), JSON.stringify(order)).toPromise();
    return res;
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
