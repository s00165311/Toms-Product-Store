import { ProductService } from '../shared/product.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from './products.interface'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle: string = "Tom's Product Store";
  imageWidth: number = 50;
  imageMargin: number = 2;
  errorMessage: string;
  showImage: boolean = false;

  _listFilter: string;
  //2)We are then returning this value.
  get listFilter(): string {
    return this._listFilter;
  }
  //1)We are retrieving a value from an input and setting the _listFilter variable to that value;
  set listFilter(value: string) {
    this._listFilter = value;
    //If the listFilter is empty
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: IProduct[];
  products: IProduct[];

  constructor(private _productService: ProductService) {

  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) != -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  public ngOnInit(): void {
    this._productService.getProducts().subscribe(products => {
      this.products = products,
      this.filteredProducts = this.products;
    },
      error => this.errorMessage = <any>error);
  }
}