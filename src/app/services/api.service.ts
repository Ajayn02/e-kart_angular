import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_url='http://localhost:3000'

  wishcount:any=new BehaviorSubject(0)

  constructor(private http:HttpClient) {
      this.getWishCount()
   }

  getWishCount(){
    this.getWishApi().subscribe({
      next:(res:any)=>{
        this.wishcount.next(res.length)
      }
    })
  }

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

  appendTokenToHeader(){
    let header=new HttpHeaders()
    header=header.append('Content-Type','application/json')
    header=header.append('Authorization',`Token ${sessionStorage.getItem('token')}`)
    return {headers:header}
  }

  addToWishApi(data:any){
    return this.http.post(`${this.base_url}/addwish`,data,this.appendTokenToHeader())
  }

  getWishApi(){
    return this.http.get(`${this.base_url}/wishitems`,this.appendTokenToHeader())
  }

  removeWishApi(id:any){
    return this.http.delete(`${this.base_url}/removewish/${id}`,this.appendTokenToHeader())

  }

}
