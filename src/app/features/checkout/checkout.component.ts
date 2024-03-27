import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Product } from '@shared/models/product.interface';
import { CartStore } from '@shared/store/shopping-cart.store';
import { CheckoutService } from './services/checkout.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export default class CheckoutComponent {
  cartStore = inject(CartStore);

  private readonly _checkoutSvc = inject(CheckoutService);

  clearAll(): void {
    this.cartStore.clearCart();
  }

  removeProduct(productId: number): void {
    this.cartStore.remoteFromCart(productId);
  }

  onPay(): void {
    this._checkoutSvc.onPay(this.cartStore.products());
  }
}
