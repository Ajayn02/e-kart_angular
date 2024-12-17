import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { error } from 'console';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,NgIf,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  wCount:any=''
  cConut:any=''
  user:any=''

  searchkey:any=""

  constructor(private api:ApiService , private router:Router,private tostr:ToastrService){
    this.api.wishcount.subscribe({
      next:(res:any)=>{
        // console.log(res);
        this.wCount=res
      }
    })

    this.api.cartCount.subscribe({
      next:(res:any)=>{
        // console.log(res);
        this.cConut=res
      }
    })

  }

  ngOnInit(): void {
    if(sessionStorage.getItem('user')){
      this.user=sessionStorage.getItem('user')
    }
  }

  handleLogout(){
    sessionStorage.clear()
    this.wCount=0
    this.cConut=0
    this.tostr.info("LogOut success")
    this.router.navigateByUrl('/log')
  }

  handleSearch(){
    this.api.serachkey.next(this.searchkey)
  }

}
