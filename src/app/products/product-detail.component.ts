import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';

import { ProductService } from './product.service';
import { Subscription } from "rxjs";

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product: IProduct | undefined

  sub!: Subscription;
  products: IProduct[] = [];
  errorMessage: string = '';

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle += `: ${id}`

    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.product = products[products.findIndex(x => x.productId === id)];

        // const result = products.find(({ id }) => id === 'cherries');
        // console.log(Object.values(products[id]))   
        // console.log(typeof(id))
        // console.log(products.findIndex(x => x.productId === id))
      },
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/products'])
  }

}
