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
serverMessage: any;
  
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
    if(this.usernameForms){
      document.body.classList.add('scroll-locked')
    } else {
      this.newUsername = ''
      this.serverMessage = ''
      document.body.classList.remove('scroll-locked')
    }
  }
  async changeUsername(username: string) {
    const token = sessionStorage.getItem('token')
    if(token){
      await this.mainService.changeUsername(token, username).subscribe({
        next: (res) =>{
          if(res.updated){
            this.serverMessage = res.message
            setTimeout(()=> window.location.reload(), 1500)
          }
        },
        error: (err) => {
          if(err.status === 409){
            this.serverMessage = 'Nazwa użytkownika już istnieje'
            console.log('Username is already taken')
          } else if(err.status === 400) {
            this.serverMessage === err.message
            console.log(err.message)
          }
        }
      })
    }
  }
  
}
