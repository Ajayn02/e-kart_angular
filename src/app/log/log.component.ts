import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [RouterLink,NgIf,ReactiveFormsModule],
  templateUrl: './log.component.html',
  styleUrl: './log.component.css'
})
export class LogComponent {

  logForm:FormGroup;

  constructor(private fb:FormBuilder,private api:ApiService,private toaster:ToastrService,private router:Router){
    this.logForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(3),Validators.maxLength(8),Validators.pattern('[a-zA-z0-9@_!.]+')]]
    })
  }

  handleSubmit(){
    // console.log(this.logForm.value);
    
    this.api.userLogin(this.logForm.value).subscribe({
      next:(res:any)=>{
        // console.log(res);
        sessionStorage.setItem('token',res.token)
        sessionStorage.setItem('user',res.username)
        this.api.getWishCount()
        this.toaster.success("Login Success")
        this.router.navigateByUrl('')
      },
      error:(err:any)=>{
        // console.log(err);
        if(err.error){
          this.toaster.error(err.error)
        }else{
          this.toaster.warning("Login Failed")
        }
      }
    })

  }

}
