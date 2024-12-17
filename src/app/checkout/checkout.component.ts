import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Checkoutdata } from '../interfaces/checkoutdata';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { NgxPayPalModule } from 'ngx-paypal';
import {
  IPayPalConfig,
  ICreateOrderRequest 
} from 'ngx-paypal';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';



@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [HeaderComponent,FormsModule,NgIf,NgxPayPalModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  checkform:Checkoutdata={
    name:"",
    phone:"",
    address:""
  }
  checkStatus:boolean=false
  totalamount:any=0

  payPalConfig:any={}
  

  constructor(private tostr:ToastrService , private router:Router , private api:ApiService){
    this.totalamount=sessionStorage.getItem('totalAmount')
  }

  proceedToPay(){
    this.checkStatus=true
    this.initConfig()
  }


  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'sb',
        createOrderOnClient: (data:any) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: this.totalamount,
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: this.totalamount
                        }
                    }
                }
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data:any, actions:any) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details:any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data:any) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            // this.showSuccess = true;
            this.tostr.success("CheckOut Completed.. Order Placed Successfully")
            this.checkform={
                name:"",
                phone:"",
                address:""
            }
            this.api.emptycartApi().subscribe({
                next:(res:any)=>{
                    console.log(res);
                    
                },
                error:(err:any)=>{
                    console.log(err);
                    
                }
            })
            this.api.getCartCount()
            sessionStorage.removeItem('totalAmount')
            this.router.navigateByUrl('/')

        },
        onCancel: (data:any, actions:any) => {
            console.log('OnCancel', data, actions);
            // this.showCancel = true;
            this.checkform={
                name:"",
                phone:"",
                address:""
            }
            this.tostr.warning("CheckOut Cancelled")
            sessionStorage.removeItem('totalAmount')
            this.router.navigateByUrl("/cart")
        },
        onError: (err:any) => {
            console.log('OnError', err);
            // this.showError = true;
            this.tostr.error("Something Went Wrong")
        },
        onClick: (data:any, actions:any) => {
            console.log('onClick', data, actions);
            // this.resetStatus();
        }
    };
}






}
