import { Component, inject } from '@angular/core';
import { ProductsService } from '@api/products.service';
import { CardComponent } from './card/card.component';
import { Product } from '@shared/models/product.interface';
import { CartStore } from '@shared/store/shopping-cart.store';


@Component({
    selector: 'app-products',
    standalone: true,
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss',
    imports: [CardComponent]
})
export default class ProductsComponent {
  private readonly productSvc = inject(ProductsService);
  products = this.productSvc.products;
  cartStore = inject(CartStore);

  onAddToCart(product: Product): void{
    this.cartStore.addToCart(product);
  }
}
