import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { EnquireNowComponent } from './components/enquire-now/enquire-now.component';

const routes: Routes = [
  {path:"",component:WelcomeComponent},
  {path:"home",component:HomeComponent},
  {path:"enquire-now",component:EnquireNowComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
