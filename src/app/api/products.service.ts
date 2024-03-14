import { HttpClient } from '@angular/common/http';
import {
  EnvironmentInjector,
  Injectable,
  inject,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { environment } from '@envs/environment.development';
import { Product } from '@shared/models/product.interface';
import { tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  public products = signal<Product[]>([]);
  private readonly _http = inject(HttpClient);
  private readonly _endpoint = environment.apiURL;
  private readonly _injector = inject(EnvironmentInjector);

  constructor() {
    this.getProducts();
  }

  public getProducts(): void {
    this._http
      .get<Product[]>(`${this._endpoint}/products?sort=desc`)
      .pipe(tap((product: Product[]) => this.products.set(product)))
      .subscribe();
  }

  public getProductsById(id: number) {
    return runInInjectionContext(this._injector, () =>
      toSignal<Product>(this._http.get<Product>(`${this._endpoint}/products/${id}`))
    );
  }
}
