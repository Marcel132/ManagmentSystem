import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MainService } from '../../main/main.service';
import { SharedModule } from '../../../modules/shared.module';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit{
  
  password!: string;
  email!: string
  createdAt!: string;
  username!: string;
  usernameForms: boolean = false;
  newUsername!: string;
  
  constructor(
    private title: Title,
    private mainService: MainService
  ) {}
  
  async ngOnInit() {
    this.title.setTitle('Ustawienia')
    
    if(typeof window !== 'undefined'){
      const token = sessionStorage.getItem('token')
      if(token){
        this.mainService.getUserSettingsData(token).subscribe({
          next: (data) => {
            this.email = data.data.email || 'Nie można znaleźć emaila'
            this.createdAt = data.data.createdAt || 'dd/mm/yy hh:mm:ss'
            this.username = data.data.username || 'Brak nazwy uzytkownika'
            this.password = '*********'
          },
          error: (error) => {
            console.log(error)
          }
        })
      }
    }
  }
  toogleChangeUsernameForms() {
    this.usernameForms = !this.usernameForms
  }
  changeUsername(username: string) {
    console.log(username)
    // this.mainService.changeUsername(username)
  }
  
}
