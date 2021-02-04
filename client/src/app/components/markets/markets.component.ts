import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { Market } from 'src/app/models/market.model';
import { Product } from 'src/app/models/product.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MarketService } from 'src/app/services/market.service';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.scss'],
})
export class MarketsComponent implements OnInit {
  markets: Market[] = [];

  @ViewChildren('checkboxes') checkboxes: QueryList<ElementRef>;

  constructor(
    private marketService: MarketService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    if (!this.authService.getLoggedUser())
      router.navigateByUrl('/login?auth=1');
  }

  ngOnInit(): void {
    this.marketService.getMarkets().then((res) => {
      this.markets = res;
    });
  }
}
