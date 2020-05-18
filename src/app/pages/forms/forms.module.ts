import { AddBannerComponent } from './add-banner/add-banner.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbSpinnerModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsRoutingModule } from './forms-routing.module';
import { FormsComponent } from './forms.component';
import { FormsModule as ngFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCompanyComponent } from './add-company/add-company.component';
import { AddPieceComponent } from './add-piece/add-piece.component';
import { AddPriceComponent } from './add-price/add-price.component';
import { AddProducerComponent } from './add-producer/add-producer.component';
import { AddSellerComponent } from './add-seller/add-seller.component';
import { AddSupporterComponent } from './add-supporter/add-supporter.component';
import { AddStandardComponent } from './add-standard/add-standard.component';
import { AddUserComponent } from './add-user/add-user.component';

@NgModule({
  imports: [
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    FormsRoutingModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
    NbSpinnerModule,
    ReactiveFormsModule,
    FileUploadModule,
  ],
  declarations: [
    FormsComponent,
    AddCategoryComponent,
    AddBannerComponent,
    AddCompanyComponent,
    AddPieceComponent,
    AddPriceComponent,
    AddProducerComponent,
    AddSellerComponent,
    AddStandardComponent,
    AddSupporterComponent,
    AddUserComponent,
  ],
})
export class FormsModule { }
