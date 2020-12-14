import { Injectable } from '@angular/core';
import {Product} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private cart: Product[] = [
    {
      name: "Bananas",
      price: 1.23,
      amount: 2,
      image: "https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG.jpg"
    },
    {
      name: "Apples",
      price: 1.5,
      amount: 3,
      image: "https://images.heb.com/is/image/HEBGrocery/000320625"
    },
    {
      name: "Oranges",
      price: 1.87,
      amount: 4,
      image: "https://produits.bienmanger.com/38345-0w470h470_Organic_Navelate_Oranges.jpg"
    }
  ];

  private products: Product[] = [
    {
      name: "Bananas",
      price: 1.23,
      amount: 2,
      image: "https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG.jpg"
    },
    {
      name: "Apples",
      price: 1.5,
      amount: 3,
      image: "https://images.heb.com/is/image/HEBGrocery/000320625"
    },
    {
      name: "Oranges",
      price: 1.87,
      amount: 4,
      image: "https://produits.bienmanger.com/38345-0w470h470_Organic_Navelate_Oranges.jpg"
    },
    {
    name: "Bananas",
      price: 1.23,
      amount: 2,
      image: "https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG.jpg"
    },
    {
      name: "Apples",
      price: 1.5,
      amount: 3,
      image: "https://images.heb.com/is/image/HEBGrocery/000320625"
    },
    {
      name: "Oranges",
      price: 1.87,
      amount: 4,
      image: "https://produits.bienmanger.com/38345-0w470h470_Organic_Navelate_Oranges.jpg"
    },
    {
    name: "Bananas",
      price: 1.23,
      amount: 2,
      image: "https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG.jpg"
    },
    {
      name: "Apples",
      price: 1.5,
      amount: 3,
      image: "https://images.heb.com/is/image/HEBGrocery/000320625"
    },
    {
      name: "Oranges",
      price: 1.87,
      amount: 4,
      image: "https://produits.bienmanger.com/38345-0w470h470_Organic_Navelate_Oranges.jpg"
    },
    {
    name: "Bananas",
      price: 1.23,
      amount: 2,
      image: "https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG.jpg"
    },
    {
      name: "Apples",
      price: 1.5,
      amount: 3,
      image: "https://images.heb.com/is/image/HEBGrocery/000320625"
    },
    {
      name: "Oranges so se prodava na parce i na kilo kako sakas ti Oranges so se prodava na parce i na kilo kako sakas ti Oranges so se prodava na parce i na kilo kako sakas ti",
      price: 1.87,
      amount: 4,
      image: "https://produits.bienmanger.com/38345-0w470h470_Organic_Navelate_Oranges.jpg"
    },
    {
    name: "Bananas",
      price: 1.23,
      amount: 2,
      image: "https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG.jpg"
    },
    {
      name: "Apples",
      price: 1.5,
      amount: 3,
      image: "https://images.heb.com/is/image/HEBGrocery/000320625"
    },
  ];

  constructor() { }

  public getCart() { return this.cart; }

  public getProducts() { return this.products; }

  public addToCart(product: Product) { this.cart.push(product); }

  decreaseProductAmount(product: Product) { 
    let cartProduct = this.cart.find(x => x === product);

    if (cartProduct.amount > 1)
      cartProduct.amount--; 
  }

  increaseProductAmount(product: Product) { 
    this.cart.find(x => x === product).amount++;
  }

  public deleteAllFromCart(product: Product) {
    this.cart = this.cart.filter(item => item !== product);
  }

  public emptyCart() { this.cart = []; }
}
