import { Component, OnInit } from '@angular/core';
import { Order, OrderState } from 'src/app/models/order.model';
import { Product } from 'src/app/models/product.model';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: Product[] = [];

  constructor(private productService: ProductService, private orderService: OrderService) {}

  ngOnInit(): void {
    this.cart = this.productService.getCart();
  }

  decreaseProductAmount(product: Product) {
    this.productService.decreaseProductAmount(product);
  }

  increaseProductAmount(product: Product) {
    this.productService.increaseProductAmount(product);
  }

  deleteProduct(product: Product) {
    this.productService.deleteAllFromCart(product);
    this.cart = this.productService.getCart();
  }

  calculateSubTotal() {
    return this.cart
      .reduce((sum, obj) => sum + obj.Price * obj.Amount, 0)
      .toFixed(2);
  }

  calculateShipping() {
    return this.cart
      .reduce((sum, obj) => sum + obj.Price * obj.Amount * 0.12, 0)
      .toFixed(2);
  }

  makeOrder() {
    let order: Order = {
      OrderState: OrderState.Ordered,
      ProductOrder: this.cart
    };

    // TODO: Subscribe after added Order functionality to backend
    this.orderService.addOrder(order);//.subscribe();

    this.productService.emptyCart();
    this.cart = this.productService.getCart();
  }
}
