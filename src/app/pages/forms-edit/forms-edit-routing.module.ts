import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EditUserComponent} from './edit-user/edit-user.component';
import {FormsEditComponent} from './forms-edit.component';
import {EditCompanyComponent} from './edit-company/edit-company.component';
import {EditSellerComponent} from './edit-seller/edit-seller.component';
import {EditProducerComponent} from './edit-producer/edit-producer.component';

const routes: Routes = [
  {
    path: '',
    component: FormsEditComponent,
    children: [
      {
        path: 'edit-user/:id',
        component: EditUserComponent,
      },
      {
        path: 'edit-company/:id',
        component: EditCompanyComponent,
      },
      {
        path: 'edit-seller/:id',
        component: EditSellerComponent,
      },
      {
        path: 'edit-producer/:id',
        component: EditProducerComponent,
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

