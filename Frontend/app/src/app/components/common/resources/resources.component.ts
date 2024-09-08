import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../modules/shared.module';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss'
})
export class ResourcesComponent implements OnInit{
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  maxSpace: number = 10;
  availableSpace: number = this.maxSpace - this.items.length
  errorWindow!: boolean;
  
  ngOnInit(): void {
    this.availableSpace= this.maxSpace - this.items.length
  } 
  
  addResource() {
    if(this.availableSpace == 0){
      this.errorWindow = true
      if(this.errorWindow){
        document.body.classList.add('scroll-locked')
        setTimeout(()=> {
          this.errorWindow = false
          document.body.classList.remove('scroll-locked')
        }, 5000)
        return false
      }
    }
      this.items.push(this.items.length + 1)
      this.availableSpace = this.maxSpace - this.items.length
      return true
  }
}
