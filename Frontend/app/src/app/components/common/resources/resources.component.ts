import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared.module';
import { MainService } from '../../main/main.service';
import { Title } from '@angular/platform-browser';

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

  constructor(
    private title: Title,
    private mainService: MainService
  ){}
  items: any = [];
  maxSpace!: number;
  availableSpace: number = this.maxSpace - this.items.length
  errorWindow!: boolean;
  
  ngOnInit() {
    this.title.setTitle('Zasoby')
    if(typeof window != 'undefined'){
      this.mainService.getResourcesData().subscribe({
        next: (res) => {
          console.log(res)
          if(res){
            if(res.hasSub.planUltimate){
              this.maxSpace = 15
            } else if(res.hasSub.planPremium){
              this.maxSpace = 13
            } else if(res.hasSub.planFree){
              this.maxSpace = 10
            }

            let resourcesData = res.data.resources

            resourcesData.forEach((element: any) => {
              this.items.push(element)
            });

            console.log(this.items)
            
            this.availableSpace = this.maxSpace - this.items.length
          }
        }
      })
    }
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
    removeResource() {
      this.items.pop()
      this.availableSpace = this.maxSpace - this.items.length
    }
  }
  