import { Component, Input, OnInit, Signal, inject, input } from '@angular/core';
import { ProductsService } from '@api/products.service';
import { Product } from '@shared/models/product.interface';
import { CurrencyPipe } from '@angular/common';
import { CartStore } from '@shared/store/shopping-cart.store';
// import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export default class DetailsComponent implements OnInit {
  starsArray: number[] = new Array(5).fill(0);
  productId = input<number>(0, { alias: 'id' }); // @Input({ alias: 'id}' }) productId!: number;
  product!: Signal<Product | undefined>;

  private readonly producSvc = inject(ProductsService);
  // private readonly _sanitizer = inject(DomSanitizer);
  cartSore = inject(CartStore);

  ngOnInit(): void {
    this.product = this.producSvc.getProductsById(this.productId());
  }

  onAddToCart() {
    this.cartSore.addToCart(this.product() as Product);
  }

  generateSvgS(index: number): string {
    let svgContent = '';
    const rate = this.product()?.rating.rate as number;
    if (index + 1 <= Math.floor(rate)) {
      //complete
      svgContent = 'assets/images/full.svg';
    } else if (index < rate) {
      //half
      svgContent = 'assets/images/half.svg';
    } else {
      //empty
      svgContent = 'assets/images/empty.svg';
    }
    // return this._sanitizer.bypassSecurityTrustHtml(svgContent);
    return svgContent;
  }
}
