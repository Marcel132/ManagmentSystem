import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MainService } from '../../main/main.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit{
  
  password: any;
  email: string = ''
  createdAt: any;
  username: any;
  
  constructor(
    private title: Title,
    private mainService: MainService
  ) {}
  
  ngOnInit() {
    this.title.setTitle('Ustawienia')
    
    this.email === '' ? this.email = 'Brak emaila' :this.email = 'EMail'
  }
  changeUsername() {
    this.mainService.changeUsername()
  }

}
