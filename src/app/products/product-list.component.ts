import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from './product.service';

@Component({
    selector: 'pm-products',
    styleUrls: ['./product-list.component.css'],
    templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit, OnDestroy {

    pageTitle: string = 'Product List';
    isDisabled: boolean = false;
    showImage: boolean = true;
    errorMessage: string = '';
    
    // sub: Subscription | undefined;
    sub!: Subscription;
    
    private _listFilter: string = '';
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        console.log('In settter:', value)
        this.filteredProducts = this.performFilter(value);
    }
    
    ngOnInit(): void {
        this.sub = this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        });
    }
    
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    onRatingClicked(message: string): void {
        this.pageTitle = `Product List: ${message}`;
    }
    
    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];
    
    constructor(private productService: ProductService) {}
    
    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => 
        product.productName.toLocaleLowerCase().includes(filterBy));
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    };
}

function subscribe() {
    throw new Error("Function not implemented.");
}
