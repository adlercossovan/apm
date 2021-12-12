import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { IProduct } from "./product";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productUrl = 'api/products/products.json';

    constructor(private http: HttpClient) {}

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            // tap(data => console.log('All', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }


    private handleError(err: HttpErrorResponse) {
        //in a real world app, we may send the server some remote logging infrastructure
        //instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            // a client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error ocurred: ${err.error.message}`;
        } else {
            // The backend returned and unsucessful response code.
            // The response body may contain clues as to what went worng
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}