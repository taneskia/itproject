import { Component, OnInit } from '@angular/core';
import { Order, OrderState } from 'src/app/models/order.model';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: Product[] = [];

  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    console.log(this.cart);
  }

  decreaseProductAmount(product: Product) {
    this.cartService.decreaseProductAmount(product);
  }

  increaseProductAmount(product: Product) {
    this.cartService.increaseProductAmount(product);
  }

  deleteProduct(product: Product) {
    this.cartService.deleteAllFromCart(product);
    this.cart = this.cartService.getCart();
  }

  calculateSubTotal() {
    return this.cart
      .reduce((sum, obj) => sum + obj.price * obj.amount, 0)
      .toFixed(2);
  }

  calculateShipping() {
    return this.cart
      .reduce((sum, obj) => sum + obj.price * obj.amount * 0.12, 0)
      .toFixed(2);
  }

  makeOrder() {
    let order: Order = {
      OrderState: OrderState.Ordered,
      ProductOrder: this.cart,
      Address: 'Kire Gavriloski 26',
    };

    this.orderService.addOrder(order).then(
      () => {
        this.cartService.emptyCart();
        this.cart = this.cartService.getCart();
      },
      (err) => console.log(err)
    );
  }
}
