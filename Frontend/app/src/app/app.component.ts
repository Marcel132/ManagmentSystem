import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AppModule } from './app.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    AppModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  
  constructor(
    private router: Router
  ){}
  
  title = 'app';
  
  isLogged: boolean = false;
  
  ngOnInit() {
    if(typeof window !== 'undefined'){
      if(sessionStorage.getItem('accessToken')){
        this.isLogged = true;
      } else {
        this.isLogged = false
      }
      if(this.isLogged === true){
        this.router.navigate(['/home']);
      } else if(this.isLogged === false){
        this.router.navigate(['/login'])
      }
    }
  }

}
