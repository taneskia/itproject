import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UtilitiesService {
    constructor() {}
    
    private baseURL = 'http://localhost:5000/';
    
    private authAPI = this.baseURL + 'api/Accounts/';
    private buyerAPI = this.baseURL + 'api/Buyer/';
    private marketAPI = this.baseURL + 'api/Market/';
    private productAPI = this.baseURL + 'api/Product/';
    private freelancerAPI = this.baseURL + 'api/Freelancer/';
    
    getAuthApi(path: string = ''): string {
        return this.authAPI + path;
    }
    
    getBuyerApi(path: string = ''): string {
        return this.buyerAPI + path;
    }
    
    getMarketApi(path: string = ''): string {
        return this.marketAPI + path;
    }
    
    getProductApi(path: string = ''): string {
        return this.productAPI + path;
    }

    getFreelancerApi(path: string = ''): string {
        return this.freelancerAPI + path;
    }
}
