
import { Injectable } from '@angular/core';
import { Page } from '../models/page';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import{environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  serverUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }
  
  getPages() {
    return this.http.get<Page>(this.serverUrl + 'api/adminPages').pipe(
      catchError(this.handleError)
    );
  }

  getPage(id:number) {
    console.log('ID API');
    return this.http.get<Page>(this.serverUrl + 'api/adminPage/'+id).pipe(
      catchError(this.handleError)
    );
  }

  
  createpage(page){
    console.log('Create API');
    return this.http.post<any>(this.serverUrl +'api/createPage',page).pipe(
      catchError(this.handleError)
    );
  }
 
  updatepage(page,id:number){
    console.log('updatepage API');
  return this.http.post<any>(this.serverUrl + 'api/updatepage/' + id, page).pipe(
    catchError(this.handleError)
  );
  }

  deletepage(id:number){
    return this.http.delete(this.serverUrl+'api/deletePage/'+id).pipe(
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

