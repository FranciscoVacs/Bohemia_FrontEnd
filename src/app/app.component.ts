import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component.js';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Bohemia_FrontEnd';
}
