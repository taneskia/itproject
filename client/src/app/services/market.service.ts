import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UtilitiesService } from '../helpers/utilities.service';
import { Market } from '../models/market.model';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  private markets: Market[] = [];

  constructor(private http: HttpClient, private utils: UtilitiesService) {}

  public async getMarkets(): Promise<Market[]> {
    await this.getMarketsFromDB().then((res: Market[]) => this.setMarkets(res));

    return this.markets;
  }

  public setMarkets(markets: Market[]) {
    this.markets = markets;
  }

  private async getMarketsFromDB() {
    const res = await this.http.get(this.utils.getMarketApi()).toPromise();
    return res;
  }
}
