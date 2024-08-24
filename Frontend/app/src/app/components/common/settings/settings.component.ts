import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit{
password: any;
  
  constructor(
    private title: Title,
  ) {}
  
  ngOnInit() {
    this.title.setTitle('Ustawienia')
  }
  email: any;
  createdAt: any;
  username: any;
}
