import { Injectable } from '@angular/core';
import{Category} from '../models/category';
import{HttpClient,HttpErrorResponse} from '@angular/common/http';
import { throwError } from 'rxjs';
import{catchError} from 'rxjs/operators';
import{environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

 serverUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }
  getcategory(){
    return this.http.get<Category>(this.serverUrl+'api/adminCategorys').pipe(
      catchError(this.handleError)
    );
  }

  getCategories(id:number){
   // console.log('Hello');
  return this.http.get<Category>(this.serverUrl+'api/adminCagories/'+id).pipe(
  catchError(this.handleError)
  );
  }

  createcategory(category){
    return this.http.post<any>(this.serverUrl +'api/createcategory',category).pipe(
      catchError(this.handleError)
    );
  }
 
  updatecategory(category,id:number){
  return this.http.post<any>(this.serverUrl + 'api/updatecategory/' + id, category).pipe(
    catchError(this.handleError)
  );
  }

  deleteCategory(id:number){
    return this.http.delete(this.serverUrl+'api/deletecate/'+id).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.

      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.

      // The response body may contain clues as to what went wrong.

      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message
    
    return throwError('Something bad happened. Please try again later.');
  }
}