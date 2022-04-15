import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConverterComponent } from './components/converter/converter.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [

  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'conversion/:id',
    component: ConverterComponent,
  },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
