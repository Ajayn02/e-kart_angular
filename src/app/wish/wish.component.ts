import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgFor , NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wish',
  standalone: true,
  imports: [HeaderComponent,RouterLink,NgFor , NgIf],
  templateUrl: './wish.component.html',
  styleUrl: './wish.component.css'
})
export class WishComponent implements OnInit {

  wishItems:any=[]

  constructor(private api:ApiService , private toastr:ToastrService){}

  ngOnInit(): void {
    this.api.getWishApi().subscribe({
      next:(res:any)=>{
        // console.log(res);
        this.wishItems=res
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  removeFromWish(id:any){
    this.api.removeWishApi(id).subscribe({
      next:(res:any)=>{
        // console.log(res);
        // this.toastr.success("Deleted")
        this.ngOnInit()
        this.api.getWishCount()
      },
      error:(err:any)=>{
        console.log(err);
        if(err.error){
          this.toastr.error(err.error)
        }else{
          this.toastr.error("Deletion Failed")
        }
      }
    })
  }

  addToCart(data:any){
    this.api.addToCartApi(data).subscribe({
      next:(res:any)=>{
        // console.log(res);
        this.removeFromWish(data._id)
        this.api.getCartCount()
        this.toastr.success("Added To Cart")
      },
      error:(err:any)=>{
        console.log(err);
        this.toastr.error("Something Went Wrong")
      }
    })
  }


}
