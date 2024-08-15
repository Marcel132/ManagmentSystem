import { NgModule } from '@angular/core';
import { SharedModule } from './modules/shared.module';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { AuthModule } from './components/auth/auth.module';
import { AuthService } from './components/auth/auth.service';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    AuthModule,
    HeaderComponent,
    FooterComponent,
  ],
  exports: [
    CommonModule,
    SharedModule,
    AuthModule,
    HeaderComponent,
    FooterComponent,
  ],
  providers: [
  ]
})
export class AppModule { }
