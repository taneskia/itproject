import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  markets: String[] = [];
  private filteredMarkets: String[] = [];

  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;

  constructor(
    private productService: ProductService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    //if (!this.authService.getLoggedUser())
    //  router.navigateByUrl('/login?auth=1');
  }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.markets = [...new Set(this.products.map(p => { return p.Market.Name }))]
  }

  addToCart(product: Product): void {
    this.productService.addToCart(product);
  }

  filterProducts(event: any): void {
    if(event.target.checked)
      this.filteredMarkets.push(event.target.value);

    else this.filteredMarkets.splice(this.filteredMarkets.indexOf(event.target.value), 1);

    this.products = this.productService.getProducts().filter(p => this.filteredMarkets.includes(p.Market.Name));

    if(this.filteredMarkets.length === 0)
      this.clearFilters();
  }

  clearFilters() {
    this.checkboxes.forEach(el => el.nativeElement.checked = false);
    this.filteredMarkets = [];
    this.products = this.productService.getProducts();
  }
}
