import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EditUserComponent} from './edit-user/edit-user.component';
import {FormsEditComponent} from './forms-edit.component';

const routes: Routes = [
  {
    path: '',
    component: FormsEditComponent,
    children: [
      {
        path: 'edit-user/:id',
        component: EditUserComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class FormsEditRoutingModule {
}

