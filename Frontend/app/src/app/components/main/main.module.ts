import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../common/header/header.component';
import { FooterComponent } from '../common/footer/footer.component';
import { HomeComponent } from '../common/home/home.component';
import { ResourcesComponent } from '../common/resources/resources.component';
import { SettingsComponent } from '../common/settings/settings.component';
import { CreateResourceComponent } from '../common/create-resource/create-resource.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ResourcesComponent,
    SettingsComponent,
    CreateResourceComponent
  ], 
  exports: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ResourcesComponent,
    SettingsComponent,
    CreateResourceComponent
  ]
})
export class MainModule { }
