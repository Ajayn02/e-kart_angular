import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RouterLink, NgFor, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  products: any = []

  constructor(private api: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.api.getAllPosts().subscribe({
      next: (res: any) => {
        // console.log(res);
        this.products = res
      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }

  handleAddWish(data: any) {
    if (sessionStorage.getItem('token')) {
      this.api.addToWishApi(data).subscribe({
        next: (res: any) => {
          // console.log(res);
          this.toastr.success("Added")
          this.api.getWishCount()
        },
        error: (err: any) => {
          console.log(err);
          if (err.error) {
            this.toastr.warning(err.error)
          } else {
            this.toastr.error("Failed")
          }
        }
      })
    } else {
      this.toastr.error("Please Login first")
    }

  }

  addCart(data: any) {
    if (sessionStorage.getItem('token')) {
      this.api.addToCartApi(data).subscribe({
        next: (res: any) => {
          this.toastr.success(res)
        },
        error: (err: any) => {
          if (err.error) {
            this.toastr.error(err.error)
          } else {
            this.toastr.error('Add To Cart Failed')
          }
        }
      })
    }
    else {
      this.toastr.warning("Please Login First")
    }
  }

}
