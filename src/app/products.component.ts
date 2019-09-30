import { Component } from '@angular/core';
import { ProductsService } from './products.service';

@Component({
  selector: 'products-component',
  templateUrl: './products.component.html'
})
export class ProductsComponent {
  productName = '박준우';
  isDisabled = true;
  products = [];

  constructor(private productsService: ProductsService) { 
    setTimeout(() => {
      this.isDisabled = false;
      this.products = this.productsService.getProducts();
    }, 3000);
  }

  ngOnInit() {
  }

  changeName() {
    this.productName="가오니";
    this.isDisabled = !this.isDisabled;
  }

  onAddProduct(form) {
    //input에 아무것도 없으면 false.
    if(form.valid) {
      // this.products.push(form.value.productName);
      this.productsService.addProduct(form.value.productName);
    }
  }

  onRemoveProduct(product: string) {
    this.products = this.products.filter(p => {
      return p !== product;
    })
  }
}