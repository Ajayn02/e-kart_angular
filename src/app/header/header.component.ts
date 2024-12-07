import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { error } from 'console';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  wCount:any=''

  constructor(private api:ApiService){
    this.api.wishcount.subscribe({
      next:(res:any)=>{
        // console.log(res);
        this.wCount=res
      }
    })
  }

}
