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

  public async addMarketProduct(product: Product): Promise<any> {
    const response = await this.http
      .post(this.utils.getMarketApi(), JSON.stringify(product))
      .toPromise();
    return response;
  }

  public async deleteMarketProduct(product: Product): Promise<any> {
    const response = await this.http
      .delete(this.utils.getMarketApi(product.id.toString()))
      .toPromise();
    return response;
  }
}
