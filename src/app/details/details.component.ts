import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {

  product:any=[]
  pid:any=''
  constructor(private ac:ActivatedRoute,private api:ApiService){
    this.ac.params.subscribe({
      next:(res:any)=>{
        // console.log(res);
        this.pid=res.id
        // console.log(this.pid);
        
      }
    })
  }

  ngOnInit(): void {
    this.api.getOnePost(this.pid).subscribe({
      next:(res:any)=>{
        // console.log(res);
        this.product=res
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

}
