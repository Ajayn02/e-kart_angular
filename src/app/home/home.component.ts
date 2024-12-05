import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { OnInit } from '@angular/core';
import { NgFor,NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,RouterLink,NgFor,NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  products:any=[]

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.api.getAllPosts().subscribe({
      next:(res:any)=>{
        // console.log(res);
        this.products=res
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

}
