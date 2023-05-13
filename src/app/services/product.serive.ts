import { products } from 'src/app/data/product';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, catchError, delay, retry, tap, throwError } from 'rxjs';
import { IProduct } from 'src/app/models/product';
import { ErrorService } from './error.service';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  products: IProduct[] = [];

  getAll(): Observable<IProduct[]> {
    return this.http
      .get<IProduct[]>('https://fakestoreapi.com/products', {
        //!1 params: new HttpParams().append('limit', 5),
        //!2 params: new HttpParams({
        //!   fromString: 'limit=6',
        //! }),

        //!3
        params: new HttpParams({
          fromObject: {
            limit: 5,
          },
        }),
      })
      .pipe(
        delay(500),
        retry(2),
        tap((products) => (this.products = products)),
        catchError(this.errorHandler.bind(this))
      );
  }

  create(product: IProduct): Observable<IProduct> {
    return this.http
      .post<IProduct>('https://fakestoreapi.com/products', product)
      .pipe(tap((product) => this.products.push(product)));
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
