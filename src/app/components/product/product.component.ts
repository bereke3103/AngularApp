import { products } from './../../data/product';
import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/models/product';

//Декоратор
@Component({
  //параметр selector
  //затем этот селектор мы можем использовать в самой верстке
  selector: 'app-product',

  //Путь до шаблона
  templateUrl: './product.component.html',
})
export class ProductComponent {
  //декоратор Input => исправили ошибку, изменив некоторую настройку в tsconfig.json
  @Input() product: IProduct;

  //Для использования кнопочки
  details = false;
}
