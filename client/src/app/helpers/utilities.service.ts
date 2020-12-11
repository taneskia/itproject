import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  private baseURL = 'https://localhost:5001';

  private authAPI = this.baseURL + '/api/Authentication/';

  getAuthApi(path: string = ''): string { return this.authAPI + path; }
}
