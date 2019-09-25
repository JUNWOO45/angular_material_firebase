import { Component } from '@angular/core';

@Component({
  selector: 'products-component',
  templateUrl: './products.component.html'
})
export class ProductsComponent {
  productName = '박준우';
  isDisabled = false;
  products = ['책', '공', '칼', '총'];

  constructor() { 
    // setTimeout(() => {
    //   this.isDisabled = true;
    // }, 3000);
  }

  ngOnInit() {
  }

  changeName() {
    this.productName="가오니";
    this.isDisabled = !this.isDisabled;
  }

  onAddProduct() {
    this.products.push(this.productName);
  }
}