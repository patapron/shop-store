import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Product } from '@shared/models/product.interface';
import { CartStore } from '@shared/store/shopping-cart.store';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export default class CheckoutComponent {
  cartStore = inject(CartStore);

  clearAll() {}

  removeProduct(productId: number) {}
}
