import { Component } from '@angular/core';
import { SharedModule } from '../../../modules/shared.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    SharedModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  
  isActive: boolean = true;
  
  toogleNavbar() {
    this.isActive = !this.isActive
  }
  hideNav() {
    this.isActive = false;
  }
  
  logOut() {
    sessionStorage.removeItem('token');
    document.body.style.cursor = 'wait !important';

    setTimeout(() => window.location.reload(), 1500);

  }
}
