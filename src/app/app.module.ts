import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { BannerSliderComponent } from './components/banner-slider/banner-slider.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HoverballComponent } from './components/hoverball/hoverball.component';
import { EnquireNowComponent } from './components/enquire-now/enquire-now.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BannerSliderComponent,
    WelcomeComponent,
    HoverballComponent,
    EnquireNowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
