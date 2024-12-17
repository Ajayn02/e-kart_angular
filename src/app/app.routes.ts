import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { LogComponent } from './log/log.component';
import { RegComponent } from './reg/reg.component';
import { WishComponent } from './wish/wish.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { authGuard } from './guards/auth.guard';



export const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"reg",component:RegComponent},
    {path:"log",component:LogComponent},
    {path:"wish",canActivate:[authGuard],component:WishComponent},
    {path:"cart",canActivate:[authGuard],component:CartComponent},
    {path:"det/:id",component:DetailsComponent},
    {path:"checkout",canActivate:[authGuard],component:CheckoutComponent}

];
