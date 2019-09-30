export class ProductsService {
  private products = ['책', '공', '꿈'];

  addProduct(productName: string) {
    this.products.push(productName);
  }

  getProducts() {
    return [...this.products];
  }
}
