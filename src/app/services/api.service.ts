import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_url='https://e-kart-server-f9xj.onrender.com'

  wishcount:any=new BehaviorSubject(0)
  cartCount:any=new BehaviorSubject(0)

  serachkey:any=new BehaviorSubject("")

  constructor(private http:HttpClient) {
      this.getWishCount()
      this.getCartCount()
   }

  getWishCount(){
    this.getWishApi().subscribe({
      next:(res:any)=>{
        this.wishcount.next(res.length)
      }
    })
  }

  getCartCount(){
    this.getCartApi().subscribe({
      next:(res:any)=>{
        this.cartCount.next(res.length)
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

  // cart

  addToCartApi(data:any){
    return this.http.post(`${this.base_url}/addcart`,data,this.appendTokenToHeader())
  }

  getCartApi(){
    return this.http.get(`${this.base_url}/cartlist`,this.appendTokenToHeader())
  }

  removeFromCartApi(id:any){
    return this.http.delete(`${this.base_url}/delcart/${id}`,this.appendTokenToHeader())
  }

  increaseCartApi(id:any){
    return this.http.get(`${this.base_url}/increcart/${id}`,this.appendTokenToHeader())
  }

  decreaseCartApi(id:any){
    return this.http.get(`${this.base_url}/decrecart/${id}`,this.appendTokenToHeader())
  }

  emptycartApi(){
    return this.http.delete(`${this.base_url}/emptycart`,this.appendTokenToHeader())
  }

  checkLogin(){
    if(sessionStorage.getItem("token")){
      return true
    }else{
      return false
    }
  }



}
