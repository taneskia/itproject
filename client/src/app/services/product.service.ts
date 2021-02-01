import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UtilitiesService } from '../helpers/utilities.service';
import { Market } from '../models/market.model';
import { Product } from '../models/product.model';
import { MarketService } from './market.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private utils: UtilitiesService,
    private marketService: MarketService
  ) {}

  public getProducts() {
    return this.marketService.getMarkets();
  }

  public getProductsFromDB(): Observable<any> {
    return this.http.get(this.utils.getProductApi()).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  public addMarketProduct(product: Product): Observable<any> {
    return this.http
      .post(this.utils.getMarketApi('addProduct'), JSON.stringify(product))
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  public deleteMarketProduct(product: Product): Observable<any> {
    return this.http
      .post(
        this.utils.getMarketApi('deleteProduct/' + product.id),
        JSON.stringify(product)
      )
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => {
          return throwError(err);
        })
      );
  }
}
