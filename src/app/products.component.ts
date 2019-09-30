import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';
import { ProductsService } from './products.service';

@Component({
  selector: 'products-component',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit, OnDestroy {
  productName = '박준우';
  isDisabled = true;
  products = ['asb'];
  private productsSubscription: Subscription;

  constructor(private productsService: ProductsService) { 
    
    setTimeout(() => {
      this.isDisabled = false;
    }, 3000);
  }

  ngOnInit() {
    this.products = this.productsService.getProducts();
    this.productsSubscription = this.productsService.productsUpdated.subscribe(() => {
      this.products = this.productsService.getProducts();
    });
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
    // this.products = this.productsService.getProducts();
  }

  onRemoveProduct(product: string) {
    this.products = this.products.filter(p => {
      return p !== product;
    })
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }
}