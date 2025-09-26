import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { NgWizardModule, NgWizardConfig, THEME } from "ng-wizard";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { BannerSliderComponent } from './components/banner-slider/banner-slider.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HoverballComponent } from './components/hoverball/hoverball.component';
import { EnquireNowComponent } from './components/enquire-now/enquire-now.component';
import { PopupComponent } from './components/popup/popup.component';
import { ServicesComponent } from './components/services/services.component';
import { CourseCustomizationComponent } from './components/course-customization/course-customization.component';
import { PublicSpeakingComponent } from './components/public-speaking/public-speaking.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { QueryComponent } from './components/query/query.component';
import { QrRegistrationComponent } from './components/qr-registration/qr-registration.component';
import { ContactUs } from './components/contact-us/contact-us';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default,
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BannerSliderComponent,
    WelcomeComponent,
    HoverballComponent,
    EnquireNowComponent,
    PopupComponent,
    ServicesComponent,
    CourseCustomizationComponent,
    LoginComponent,
    QueryComponent,
    ContactUs,
    //PublicSpeakingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgWizardModule.forRoot(ngWizardConfig),
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule
  ],
  providers: [
    provideHttpClient(),
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
