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

  constructor(private freelancerService: FreelancerService) {}

  ngOnInit(): void {
    this.freelancerService.getOrders().then(res => this.orders = res);
    this.freelancerService.getAcceptedOrders().then(res => this.acceptedOrders = res);
  }

  totalOrderPrice(order: Order) {
    console.log(order);
    return +order.products.reduce(
      (sum, obj: Product) => sum + obj.price * obj.amount,
      0
    ); //+this.shippingPrice(order)).toFixed(2);
  }

  shippingPrice(order: Order) {
    return order.products.reduce(
      (sum, obj) => sum + obj.price * obj.amount * 0.12,
      0
    ).toFixed(2);
  }
}
