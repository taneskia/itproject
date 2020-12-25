import { Component, OnInit } from '@angular/core';
import {Product} from 'src/app/models/product.model';
import {ProductService} from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: Product[] = [];

  constructor(private productService: ProductService) {
  }

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
    return +(this.cart.reduce((sum, obj) => sum + obj.Price * obj.Amount, 0)).toFixed(2);
  }

  calculateShipping() {
    return +(this.cart.reduce((sum, obj) => sum + obj.Price * obj.Amount * 0.12, 0)).toFixed(2);
  }

  makeOrder() {
    this.productService.buy(this.cart).subscribe();
  }
}
