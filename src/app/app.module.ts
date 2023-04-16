import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownComponent } from './header/dropdown/dropdown.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CatalogsPageComponent } from './catalogs-page/catalogs-page.component';
import { ArticlesPageComponent } from './articles-page/articles-page.component';
import { AboutUsPageComponent } from './about-us-page/about-us-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AppRoutingModule } from './app-routing.module';
import { DropdownDirective } from './shared/dropdown.directive';
import { PhoneViewComponent } from './header/phone-view/phone-view.component';
import { PhoneDropdownComponent } from './header/dropdown/phone-dropdown/phone-dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownComponent,
    MainPageComponent,
    CatalogsPageComponent,
    ArticlesPageComponent,
    AboutUsPageComponent,
    LoginPageComponent,
    DropdownDirective,
    PhoneViewComponent,
    PhoneDropdownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
