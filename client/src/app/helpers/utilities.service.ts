import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor() {}

  private baseURL = 'http://localhost:5000';

  private authAPI = this.baseURL + '/Accounts/';
  private buyerAPI = this.baseURL + '/Buyer/';
  private marketAPI = this.baseURL + '/Market/';

  getAuthApi(path: string = ''): string {
    return this.authAPI + path;
  }
  getBuyerApi(path: string = ''): string {
    return this.buyerAPI + path;
  }
  getMarketApi(path: string = ''): string {
    return this.marketAPI + path;
  }
}
