import { Component } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { MainModule } from './main.module';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    SharedModule,
    MainModule
],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
