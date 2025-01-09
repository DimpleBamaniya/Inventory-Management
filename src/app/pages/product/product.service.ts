import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicPagingParams } from '../../core/sharedModels/paging-params.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  // Set up the Web API URL (can be stored in environment file)
    private apiUrl = "http://localhost:5062/api/Product";  // Adjust according to your API base URL
  
    getAllUser(pagination: BasicPagingParams) {
      return this.http.post<any>(`${this.apiUrl}/GetAllProductDetails`, pagination);  
    }
}
