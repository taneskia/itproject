import { Component, OnInit } from '@angular/core';
import { Order, OrderState } from 'src/app/models/order.model';
import { FreelancerService } from '../../services/freelancer.service';

@Component({
  selector: 'app-freelancer',
  templateUrl: './freelancer.component.html',
  styleUrls: ['./freelancer.component.scss']
})
export class FreelancerComponent implements OnInit {

  orders: Order[];
  acceptedOrders: Order[];
  states = OrderState;

  constructor(private freelancerService :  FreelancerService) { }

  ngOnInit(): void {
    this.orders = this.freelancerService.getOrders();
    this.acceptedOrders = this.freelancerService.getAcceptedOrders();
  }

  totalOrderPrice(order: Order) {
    return (+order.ProductOrder
      .reduce((sum, obj) => sum + obj.Price * obj.Amount, 0)); //+this.shippingPrice(order)).toFixed(2);
  }

  shippingPrice(order: Order) {
    return order.ProductOrder
      .reduce((sum, obj) => sum + obj.Price * obj.Amount * 0.12, 0).toFixed(2);
  }
}
