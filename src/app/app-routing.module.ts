import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { employees } from './services/app/lazy-loads';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/employees',
    pathMatch: 'full',
  },
  {
    path: 'employees',
    loadChildren: employees,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
