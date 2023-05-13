import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { ProductService } from 'src/app/services/product.serive';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  title = 'angular-course';
  // products: IProduct[] = [];
  loading = false;

  //Общеизвестный синтаксис доллар ($), означающий, что это - Stream
  // products$: Observable<IProduct[]>;
  term = '';

  constructor(
    public productService: ProductService,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    // this.products$ = this.productService
    //   .getAll()
    //   .pipe(tap(() => (this.loading = false)));
    this.productService.getAll().subscribe(() => {
      this.loading = false;
    });
  }
}
