import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductBrandService {

  constructor(private http: HttpClient) { }
  // Set up the Web API URL (can be stored in environment file)
  private apiUrl = "http://localhost:5062/api/Brand";  // Adjust according to your API base URL
  // Method to authenticate user via Web API
  getAllProductBrands(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/GetActiveBrands");  // Make the POST request and return the observable
  }
}
