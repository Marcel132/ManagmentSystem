import { Component, OnInit } from '@angular/core';
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
export class HeaderComponent implements OnInit{
  
  isAuthorized!: boolean;
  async ngOnInit() {
    if(typeof window !== 'undefined'){
      const authToken = await sessionStorage.getItem('tokenAuth')
      if(authToken){
        const authTokenObjectPayload =  JSON.parse(atob(authToken.split('.')[1]));
        console.log(authTokenObjectPayload)
        if(authTokenObjectPayload.isAdmin){
          console.log(authTokenObjectPayload.isAdmin)
          this.isAuthorized = true
        }
      } else if(!authToken){
        this.isAuthorized = false
      }
    }
  }
  
  isActive: boolean = true;
  
  toogleNavbar() {
    this.isActive = !this.isActive
  }
  hideNav() {
    this.isActive = false;
  }


  
  logOut() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('tokenAuth')
    document.body.style.cursor = 'wait';
    
    setTimeout(() => window.location.reload(), 1500);
  }
}
