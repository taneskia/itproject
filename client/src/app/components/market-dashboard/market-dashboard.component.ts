import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Market } from 'src/app/models/market.model';
import { Router } from '@angular/router';
import { MarketService } from 'src/app/services/market.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-market-dashboard',
  templateUrl: './market-dashboard.component.html',
  styleUrls: ['./market-dashboard.component.scss'],
})
export class MarketDashboardComponent implements OnInit {
  products: Product[] = [];
  market: Market;
  marketName: String = '';

  newProductForm: FormGroup;
  showSpinner: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private authService: AuthenticationService,
    private marketService: MarketService,
    private router: Router
  ) {
    this.newProductForm = this.formBuilder.group({
      nameProductControl: '',
      priceProductControl: '',
      imgUrlProductControl: '',
    });

    let user = this.authService.getLoggedUser();
    if (!user || user.role !== 'Market') router.navigateByUrl('/');

    this.getMarketProducts(user);
  }

  ngOnInit(): void {}

  getMarketProducts(user: User) {
    this.marketService.getMarkets().then((res) => {
      this.market = res.find((m) => m.id == user.id);
      this.marketName = this.market.name;
      this.products = this.market.products;
    });
  }

  deleteProduct(product: Product): void {
    this.productService.deleteMarketProduct(product).then(
      () => this.getMarketProducts(this.authService.getLoggedUser()),
      (err) => console.log(err)
    );
  }

  addNewProduct(): void {
    if (this.newProductForm.valid) {
      this.showSpinner = true;

      let product: Product = {
        name: this.newProductForm.controls.nameProductControl.value,
        price: this.newProductForm.controls.priceProductControl.value,
        amount: 1,
        image: this.newProductForm.controls.imgUrlProductControl.value,
      };

      this.productService.addMarketProduct(product).then(
        () => {
          this.newProductForm.reset();
          this.showSpinner = false;
          this.getMarketProducts(this.authService.getLoggedUser());
        },
        (err) => {
          console.log(err);
          this.showSpinner = false;
        }
      );
    }
  }
}
