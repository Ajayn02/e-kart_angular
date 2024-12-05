import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_url='http://localhost:3000'

  constructor(private http:HttpClient) { }

  userRegister(data:any){
      return this.http.post(`${this.base_url}/reg`,data)
  }

  userLogin(data:any){
    return this.http.post(`${this.base_url}/log`,data)
}

  getAllPosts(){
    return this.http.get(`${this.base_url}/allposts`)
  }

  getOnePost(id:any){
    return this.http.get(`${this.base_url}/oneproduct/${id}`)
  }



}
