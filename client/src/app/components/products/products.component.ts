import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { MarketService } from 'src/app/services/market.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  @ViewChildren('checkboxes') checkboxes: QueryList<ElementRef>;

  constructor(
    private marketService: MarketService,
    private cartService: CartService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    //if (!this.authService.getLoggedUser())
    //  router.navigateByUrl('/login?auth=1');
  }

  ngOnInit(): void {
    this.marketService.getMarkets().then((res) => {
      this.products = res.find(
        (m) => m.id === +this.route.snapshot.paramMap.get('id')
      ).products;
    });
  }

  addToCart(product: Product): void {
    product.amount = 1;
    this.cartService.addToCart(product);
  }
}
