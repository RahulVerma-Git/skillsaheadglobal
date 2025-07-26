import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { EnquireNowComponent } from './components/enquire-now/enquire-now.component';
import { ServicesComponent } from './components/services/services.component';
import { CourseCustomizationComponent } from './components/course-customization/course-customization.component';
import { PublicSpeakingComponent } from './components/public-speaking/public-speaking.component';
import { LoginComponent } from './components/login/login.component';
import { QrRegistrationComponent } from './components/qr-registration/qr-registration.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"services",component:ServicesComponent},
  {path:"enquire-now",component:EnquireNowComponent},
  {path:"course-customization",component:CourseCustomizationComponent},
  {path:"public-speaking",component:PublicSpeakingComponent},
  {path:"qr-registration",component:QrRegistrationComponent},
  {path:"login",component:LoginComponent},
  {path:"signup",component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
