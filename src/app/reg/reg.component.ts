import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup ,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-reg',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './reg.component.html',
  styleUrl: './reg.component.css'
})
export class RegComponent {

  // regForm:FormGroup

  constructor(private api:ApiService , private toastr:ToastrService){}
  
  
}
