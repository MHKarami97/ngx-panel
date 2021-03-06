import { NgModule } from '@angular/core';
import {
  NbCardModule, NbIconModule, NbInputModule,
  NbTreeGridModule, NbProgressBarModule, NbSpinnerModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    NbProgressBarModule,
    NbSpinnerModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class TablesModule { }
