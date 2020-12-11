import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  private baseURL = 'http://localhost:5000';

  private authAPI = this.baseURL + '/Accounts/';

  getAuthApi(path: string = ''): string { return this.authAPI + path; }
}
