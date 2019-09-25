import { Component } from '@angular/core';

@Component({
  selector: 'products-component',
  templateUrl: './products.component.html'
})
export class ProductsComponent {
  productName = '박준우';
  isDisabled = true;
  products = ['책', '공', '칼', '총'];

  constructor() { 
    setTimeout(() => {
      this.isDisabled = false;
    }, 3000);
  }

  ngOnInit() {
  }

  changeName() {
    this.productName="가오니";
    this.isDisabled = !this.isDisabled;
  }

  onAddProduct(form) {
    // this.products.push(this.productName);
    if(form.valid) {
      this.products.push(form.value.productName);
    }
  }

  onRemoveProduct(product: string) {
    this.products = this.products.filter(p => {
      return p !== product;
    })
  }
}