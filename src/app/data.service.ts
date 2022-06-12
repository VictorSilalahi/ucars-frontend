import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  readonly urlAPI = "http://127.0.0.1:8000";
  
  constructor(private http:HttpClient) { }

  // Brands Component
  getAllBrands():Observable<any[]> {
    return this.http.get<any[]>(this.urlAPI+"/v1/brands");
  }

  addBrand(val:any) {
    return this.http.post(this.urlAPI+"/v1/brands", val);
  }

  updateBrand(val:any) {
    return this.http.post(this.urlAPI+"/v1/brands/update", val);
  }

  delBrand(val:any) {
    return this.http.delete(this.urlAPI+"/v1/brands/"+val);
  }


  // Model Component
  getAllModels(val:any):Observable<any[]> {
    return this.http.get<any[]>(this.urlAPI+"/v1/models/"+val);
  }

  addModel(val:any) {
    return this.http.post(this.urlAPI+"/v1/models", val);
  }

  updateModel(val:any) {
    return this.http.post(this.urlAPI+"/v1/model/update", val);
  }

  delModel(val:any) {
    return this.http.delete(this.urlAPI+"/v1/models/"+val);
  }

  search(val:any) {
    return this.http.get(this.urlAPI+"/v1/search/"+val);
  }
}
