import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MainService } from '../../main/main.service';
import { SharedModule } from '../../../shared.module';

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
      this.mainService.getUserSettingsData().subscribe({
        next: (data) => {
          if(data && data.data ){
            this.email = data.data.email || 'Nie można znaleźć emaila'
            this.createdAt = data.data.createdAt || 'dd/mm/yy hh:mm:ss'
            this.username = data.data.username || 'Brak nazwy uzytkownika'
            this.password = '*********'
          } else {
            console.log("Error: Cannot read data")
          }
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
  }
  toggleUsernameForm() {
    this.usernameForm = !this.usernameForm
    if(this.usernameForm){
      document.body.classList.add('scroll-locked')
    } else {
      this.newUsername = ''
      this.serverMessage = ''
      document.body.classList.remove('scroll-locked')
    }
  }
  togglePasswordForm(){
    this.passwordForm = !this.passwordForm
    if(this.passwordForm){
      document.body.classList.add('scroll-locked')
    } else {
      this.newUsername = ''
      this.serverMessage = ''
      document.body.classList.remove('scroll-locked')
    }
  }
  toggleDeleteAccount() {
    this.deleteAccount = !this.deleteAccount
    if(this.deleteAccount){
      document.body.classList.add('scroll-locked')
    } else {
      document.body.classList.remove('scroll-locked')
    }
  }
  
  async changeUsername(username: string) {
    const accessToken = sessionStorage.getItem('accessToken')
    if(accessToken){
      this.mainService.changeUsername(accessToken, username).subscribe({
        next: (res) =>{
          if(res && res.updated){
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
      const accessToken = sessionStorage.getItem('accessToken')
      if(accessToken){
        this.mainService.changePassword(accessToken, password).subscribe({
          next: (res) => {
            if(res && res.updated){
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
    else if(!validatePassword){
      this.serverMessage = 'Twoje hasło nie spełnia warunków bezpieczeństwa'
    }
  }
  async funcDeleteAccount() {
    this.serverMessage = ''
    const accessToken = sessionStorage.getItem('accessToken')
    if(accessToken){
      this.mainService.deleteAccount(accessToken).subscribe({
        next: (res) => {
          if(res && res.deleted){
            this.serverMessage = res.message
            sessionStorage.clear()
            localStorage.clear()
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
