import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { ProductService } from 'src/app/services/product.serive';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private modalService: ModalService
  ) {}

  form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  get title() {
    return this.form.controls.title as FormControl;
  }

  ngOnInit(): void {}

  submit() {
    console.log(this.form.value);
    console.log(this.form);
    this.productService
      .create({
        title: this.form.value.title as string,
        price: 13,
        description: 'lorem 150',
        image: 'https://i.pravatar.cc',
        category: 'electroinc',
        rating: {
          rate: 42,
          count: 5,
        },
      })
      .subscribe(() => {
        this.modalService.close();
      });
  }
}
