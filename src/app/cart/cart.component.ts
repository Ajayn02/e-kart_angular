import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from '../services/api.service';
import { OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HeaderComponent, NgIf, NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartlist: any = []
  totalAmnt:any=0

  constructor(private api: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.api.getCartApi().subscribe({
      next: (res: any) => {
        this.cartlist = res
        this.totalAmnt=Math.ceil(res.reduce((prev:any,item:any)=>prev+(item.quantity*item.price),0))
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  handleDeleteCart(id: any) {
    if (sessionStorage.getItem('token')) {
      this.api.removeFromCartApi(id).subscribe({
        next: (res: any) => {
          console.log(res);
          this.toastr.success("Deleted")
          this.ngOnInit()
        },
        error: (err: any) => {
          console.log(err);
          if (err.error) {
            this.toastr.error(err.error)
          } else {
            this.toastr.error('Something Went Wrong')
          }
        }
      })
    } else {
      this.toastr.warning("Plese Login First")
    }

  }

  handleIncreaseQuantity(id: any) {
    if (sessionStorage.getItem('token')) {
      this.api.increaseCartApi(id).subscribe({
        next: (res: any) => {
          // this.toastr.success("Quantity Updated")
          this.ngOnInit()
        },
        error: (err) => {
          console.log(err);
          this.toastr.warning("Something Went Wrong")
        }
      })
    } else {
      this.toastr.warning("Plese Login First")
    }

  }

  handleDecreaseQuantity(id: any) {
    if (sessionStorage.getItem('token')) {
      this.api.decreaseCartApi(id).subscribe({
        next: (res: any) => {
          // this.toastr.success("Quantity Updated")
          this.ngOnInit()
        },
        error: (err) => {
          console.log(err);
          this.toastr.warning("Something Went Wrong")
        }
      })
    } else {
      this.toastr.warning("Plese Login First")
    }
  }




}
