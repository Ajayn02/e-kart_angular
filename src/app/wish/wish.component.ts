import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wish',
  standalone: true,
  imports: [HeaderComponent,RouterLink],
  templateUrl: './wish.component.html',
  styleUrl: './wish.component.css'
})
export class WishComponent {

}
