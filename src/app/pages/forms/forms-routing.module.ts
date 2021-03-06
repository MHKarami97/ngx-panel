import { AddPriceComponent } from './add-price/add-price.component';
import { AddBannerComponent } from './add-banner/add-banner.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsComponent } from './forms.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { AddPieceComponent } from './add-piece/add-piece.component';
import { AddProducerComponent } from './add-producer/add-producer.component';
import { AddSellerComponent } from './add-seller/add-seller.component';
import { AddStandardComponent } from './add-standard/add-standard.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddClientPieceComponent } from './add-clientPiece/add-clientPiece.component';
import { AddMessageComponent } from './add-message/add-message.component';
import { AddPinComponent } from './add-pin/add-pin.component';
import { EditPriceComponent } from './add-price/edit-price/edit-price.component';
import { EditStandardComponent } from './add-standard/edit-standard/edit-standard.component';

const routes: Routes = [
  {
    path: '',
    component: FormsComponent,
    children: [
      {
        path: 'add-category',
        component: AddCategoryComponent,
      },
      {
        path: 'add-banner',
        component: AddBannerComponent,
      },
      {
        path: 'add-company',
        component: AddCompanyComponent,
      },
      {
        path: 'add-piece',
        component: AddPieceComponent,
      },
      {
        path: 'add-price',
        component: AddPriceComponent,
      },
      {
        path: 'add-producer',
        component: AddProducerComponent,
      },
      {
        path: 'add-seller',
        component: AddSellerComponent,
      },
      {
        path: 'add-standard',
        component: AddStandardComponent,
      },
      {
        path: 'add-user',
        component: AddUserComponent,
      },
      {
        path: 'add-clientPiece',
        component: AddClientPieceComponent,
      },
      {
        path: 'add-message',
        component: AddMessageComponent,
      },
      {
        path: 'add-pin',
        component: AddPinComponent,
      },
      {
        path: 'edit-price/:id',
        component: EditPriceComponent,
      },
      {
        path: 'edit-standard/:id',
        component: EditStandardComponent,
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
export class FormsRoutingModule {
}

