import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppModule } from './app.module';
import { CommonModule } from '@angular/common';
import { AuthService } from './components/auth/auth.service';

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
    private authService: AuthService,
  ){}

  title = 'app';

  toogleForms!: boolean

  ngOnInit() {
    this.authService.changeFormValue$.subscribe(value=> {
      this.toogleForms = value
    })
  }

}
