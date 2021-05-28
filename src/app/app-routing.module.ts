import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ShowDataComponent } from './show-data/show-data.component';
import { ShowDataDetailComponent } from './show-data/show-data-detail/show-data-detail.component';
import {AuthGuard} from "./shared/auth.guard"

const routes: Routes = [

  {path:'login',component:LoginComponent},
  {path:'showdata',component:ShowDataComponent,canActivate:[AuthGuard]},
  {path:'showdata/:id',component:ShowDataDetailComponent,canActivate:[AuthGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // redirect to `first-component`
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
