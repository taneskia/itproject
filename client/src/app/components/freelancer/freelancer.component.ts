import { Component, OnInit } from '@angular/core';
import { Order, OrderState } from 'src/app/models/order.model';
import { FreelancerService } from '../../services/freelancer.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-freelancer',
  templateUrl: './freelancer.component.html',
  styleUrls: ['./freelancer.component.scss'],
})

export class FreelancerComponent implements OnInit {
  orders: Order[];
  acceptedOrders: Order[];
  states = OrderState;
  btnClassess: string[] = ['', '', 'btn-outline-primary', 'btn-outline-success', 'btn-outline-secondary'];

  constructor(private freelancerService: FreelancerService) {}

  ngOnInit(): void {
    this.freelancerService.getOrders().then(res => this.orders = res);
    this.freelancerService.getAcceptedOrders().then(res => this.acceptedOrders = res);
  }

  totalOrderPrice(order: Order) {
    return +order.products.reduce(
      (sum, obj: Product) => sum + obj.price * obj.amount,
      0
    ).toFixed(2); //+this.shippingPrice(order)).toFixed(2);
  }

  shippingPrice(order: Order) {
    return order.products.reduce(
      (sum, obj) => sum + obj.price * obj.amount * 0.12,
      0
    ).toFixed(2);
  }

  acceptOrder(order: Order): void {
    this.freelancerService.acceptOrder(order).then(() => {
      this.freelancerService.getOrders().then(res => this.orders = res);
      this.freelancerService.getAcceptedOrders().then(res => this.acceptedOrders = res);
    }, err => console.log(err));
  }

  updateOrderState(order: Order): void {
    this.freelancerService.updateOrderState(order).then(() => this.freelancerService.getAcceptedOrders().then(res => this.acceptedOrders = res, err => console.log(err)));
  }

  nameOfState(orderState: number): string {
    if(orderState >= 3)
      return 'Done';
    return this.states[orderState].replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ');
  }
}