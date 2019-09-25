import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productName = '박준우';
  isDisabled = false;
  products = ['책', '공', '칼', '총'];

  constructor() { 
    setTimeout(() => {
      this.isDisabled = true;
    }, 3000);
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
