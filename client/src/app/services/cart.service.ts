import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Product[] = [];

  constructor() {}

  public getCart() {
    return this.cart;
  }

  public addToCart(product: Product) {
    this.cart.find((el) => el.id === product.id)
      ? this.increaseProductAmount(product)
      : this.cart.push(product);
  }

  decreaseProductAmount(product: Product) {
    let cartProduct = this.cart.find((x) => x === product);

    if (cartProduct.amount > 1) cartProduct.amount--;
  }

  increaseProductAmount(product: Product) {
    this.cart.find((x) => x.id === product.id).amount++;
  }

  public deleteAllFromCart(product: Product) {
    this.cart = this.cart.filter((item) => item !== product);
  }

  public emptyCart() {
    this.cart = [];
  }
}
