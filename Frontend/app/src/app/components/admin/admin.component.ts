import { Component } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { AdminModule } from './admin.module';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    SharedModule,
    AdminModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
