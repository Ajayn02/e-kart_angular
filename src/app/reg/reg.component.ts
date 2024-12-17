import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup ,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-reg',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,NgIf],
  templateUrl: './reg.component.html',
  styleUrl: './reg.component.css'
})
export class RegComponent {

  regForm:FormGroup;

  constructor(private api:ApiService , private toastr:ToastrService ,private fb:FormBuilder , private router:Router){
    this.regForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(3),Validators.maxLength(8)]],
      username:['',[Validators.required,Validators.minLength(3),Validators.maxLength(8)]]
    })
  }

  handleSubmit(){
    // console.log(this.regForm.value);
    // console.log(this.regForm.valid);
    
    this.api.userRegister(this.regForm.value).subscribe({
      next:(res:any)=>{
        // console.log(res);
        this.toastr.success('Register Success')
        this.router.navigateByUrl('/log')
      },
      error:(err:any)=>{
        console.log(err);
        this.toastr.error('Register Failed')
      }
    })
  }
  
  
}
