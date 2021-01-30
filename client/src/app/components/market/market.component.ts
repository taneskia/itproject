import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {
  products: Product[] = [];

  newProductForm : FormGroup;
  showSpinner: boolean;

  constructor(private formBuilder: FormBuilder, private productService: ProductService) {
    this.newProductForm = this.formBuilder.group({
      nameProductControl: "",
      priceProductControl: "",
      imgUrlProductControl: ""
    })
   }

  ngOnInit(): void {
    this.products = this.productService.getProducts(); //TODO: smena vo getProductsByMarketID
  }

  deleteProduct(product: Product): void {
    this.productService.deleteMarketProduct(product).subscribe(
      res => this.products = this.productService.getProducts(), //TODO: smena vo getProductsByMarketID
      err => console.log(err)
    );
  }

  addNewProduct() : void {
    if(this.newProductForm.valid) {
      this.showSpinner = true;  
      let product: Product = {
          Name: this.newProductForm.controls.nameProductControl.value,
          Price: this.newProductForm.controls.priceProductControl.value,
          Amount: 1,
          Image: this.newProductForm.controls.imgUrlProductControl.value
        };
        this.newProductForm.reset();
        this.productService.addMarketProduct(product).subscribe(
          res => {
            this.products = this.productService.getProducts() //TODO: smena vo getProductsByMarketID
            this.showSpinner = false
           },
          err => {
            console.log(err)
            this.showSpinner = false;
          }
        );
    }
  }
}
