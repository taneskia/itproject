import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrderState } from 'src/app/models/order.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  states = OrderState;

  orders: Order[];

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private orderService: OrderService
  ) {
    if (!this.authService.getLoggedUser())
      router.navigateByUrl('/login');
  }

  ngOnInit(): void {
    this.orderService.getOrders().then(res => {
      this.orderService.orders = res;
      this.orders = this.orderService.orders;
    });
  }

  totalOrderPrice(order: Order) {
    return (
      +order.products.reduce(
        (sum, obj) => sum + obj.price * obj.amount,
        0
      ) + +this.shippingPrice(order)
    ).toFixed(2);
  }

  shippingPrice(order: Order) {
    return order.products.reduce(
      (sum, obj) => sum + obj.price * obj.amount * 0.12,
      0
    ).toFixed(2);
  }
}
