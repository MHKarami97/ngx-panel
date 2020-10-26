import {FileUploadModule} from '@iplab/ngx-file-upload';
import {NgModule} from '@angular/core';
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
import {FormsModule as ngFormsModule, ReactiveFormsModule} from '@angular/forms';
import {ThemeModule} from '../../@theme/theme.module';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsEditRoutingModule} from './forms-edit-routing.module';
import {EditUserComponent} from './edit-user/edit-user.component';
import {FormsEditComponent} from './forms-edit.component';

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
    FormsEditRoutingModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
    NbSpinnerModule,
    ReactiveFormsModule,
    FileUploadModule,
    NgSelectModule,
  ],
  declarations: [
    FormsEditComponent,
    EditUserComponent,
  ],
})
export class FormsEditModule {
}
