import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UtilitiesService } from '../helpers/utilities.service';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private cart: Product[] = [];

  private products: Product[] = [
    {
      ID: 1,
      Name: "Bananas",
      Price: 1.23,
      Amount: 1,
      Image: "https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG.jpg"
    },
    {
      ID: 2,
      Name: "Apples",
      Price: 1.5,
      Amount: 1,
      Image: "https://www.macdentalcare.com/pub/photo/2014-09-apple.jpg"
    },
    {
      ID: 3,
      Name: "Oranges",
      Price: 1.87,
      Amount: 1,
      Image: "https://produits.bienmanger.com/38345-0w470h470_Organic_Navelate_Oranges.jpg"
    },
    {
      ID: 4,
      Name: "Pears",
      Price: 1.23,
      Amount: 1,
      Image: "https://specials-images.forbesimg.com/imageserve/5f42b5182138dffac9bf05b7/960x0.jpg"
    },
    {
      ID: 5,
      Name: "Peaches",
      Price: 1.23,
      Amount: 1,
      Image: "https://images.heb.com/is/image/HEBGrocery/000513694"
    }
  ];

  constructor(private http: HttpClient, private utils: UtilitiesService) { }

  public getCart() { return this.cart; }

  public getProducts() { return this.products; }

  public addToCart(product: Product) {
    this.cart.find(el => el.ID === product.ID) ? this.increaseProductAmount(product) : this.cart.push(product);
  }

  decreaseProductAmount(product: Product) {
    let cartProduct = this.cart.find(x => x === product);

    if (cartProduct.Amount > 1)
      cartProduct.Amount--;
  }

  increaseProductAmount(product: Product) {
    this.cart.find(x => x === product).Amount++;
  }

  public deleteAllFromCart(product: Product) {
    this.cart = this.cart.filter(item => item !== product);
  }

  public emptyCart() { this.cart = []; }

  public buy(products: Product[]): Observable<any> {
    return this.http.post(
      this.utils.getBuyerApi('buy'), JSON.stringify(products)
    ).pipe(
      map(res => {
        return res;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
