import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productName = '박준우';

  constructor() { 
    setTimeout(() => {
      this.productName = '여울이';
    }, 2000);
    // let self = this;
    // setTimeout(function() {
    //   self.productName = '여울이';
    // }, 2000);
  }

  ngOnInit() {
  }

  changeName() {
    this.productName="가오니";
  }
}
