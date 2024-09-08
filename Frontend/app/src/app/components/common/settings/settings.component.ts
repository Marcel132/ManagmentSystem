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
  usernameForm: boolean = false;
  passwordForm: boolean = false
  newUsername!: string;
  serverMessage!: string;
  newPassword!: string;
  deleteAccount: boolean = false;
  
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
  toogleUsernameForm() {
    this.usernameForm = !this.usernameForm
    if(this.usernameForm){
      document.body.classList.add('scroll-locked')
    } else {
      this.newUsername = ''
      this.serverMessage = ''
      document.body.classList.remove('scroll-locked')
    }
  }
  tooglePasswordForm(){
    this.passwordForm = !this.passwordForm
    if(this.passwordForm){
      document.body.classList.add('scroll-locked')
    } else {
      this.newUsername = ''
      this.serverMessage = ''
      document.body.classList.remove('scroll-locked')
    }
  }
  toogleDeleteAccount() {
    this.deleteAccount = !this.deleteAccount
    if(this.deleteAccount){
      document.body.classList.add('scroll-locked')
    } else {
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
          
          if(err.error && err.error.message){
            if(err.status === 400){
              this.serverMessage = err.error.message
            }
            if(err.status === 409) {    
              this.serverMessage = err.error.message
            }
          } else {
            this.serverMessage = 'Nieoczekiwany błąd'
          }
        }	
      })
    }
  }
  async changePassword(password: string) {
    const validatePassword = this.mainService.validatePassword(password)
    if(validatePassword){
      this.serverMessage = ''
      const token = sessionStorage.getItem('token')
      if(token){
        await this.mainService.changePassword(token, password).subscribe({
          next: (res) => {
            if(res.updated){
              this.serverMessage = res.message
              setTimeout(()=> window.location.reload(), 1500)
            }
          },
          error: (err) => {
            console.log(err)
          }
        })
      }
    }
    if(!validatePassword){
      this.serverMessage = 'Twoje hasło nie spełnia warunków bezpieczeństwa'
    }
  }
  async funcDeleteAccount() {
    this.serverMessage = ''
    const token = sessionStorage.getItem('token')
    if(token){
      this.mainService.deleteAccount(token).subscribe({
        next: (res) => {
          if(res.deleted){
            this.serverMessage = res.message
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('tokenAuth')
            setTimeout(()=> window.location.reload(), 1500)
          }
        },
        error: (err) => {
          this.serverMessage = err.err.message
          console.log(err)
        }
      })
    }
  }

}
