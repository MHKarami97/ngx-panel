import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablesComponent } from './tables.component';
import { CategoryTableComponent } from './category/category-table.component';
import { BannerTableComponent } from './banner/banner-table.component';
import { CompanyTableComponent } from './company/company-table.component';
import { PriceTableComponent } from './price/price-table.component';
import { ProducerTableComponent } from './producer/producer-table.component';
import { RequestTableComponent } from './request/request-table.component';
import { SellerTableComponent } from './seller/seller-table.component';
import { StandardTableComponent } from './standard/standard-table.component';
import { SupporterTableComponent } from './supporter/supporter-table.component';
import { UserTableComponent } from './user/user-table.component';
import { PieceTableComponent } from './piece/piece-table.component';

const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [
    {
      path: 'category-table',
      component: CategoryTableComponent,
    },
    {
      path: 'banner-table',
      component: BannerTableComponent,
    },
    {
      path: 'company-table',
      component: CompanyTableComponent,
    },
    {
      path: 'price-table',
      component: PriceTableComponent,
    },
    {
      path: 'producer-table',
      component: ProducerTableComponent,
    },
    {
      path: 'request-table',
      component: RequestTableComponent,
    },
    {
      path: 'seller-table',
      component: SellerTableComponent,
    },
    {
      path: 'standard-table',
      component: StandardTableComponent,
    },
    {
      path: 'supporter-table',
      component: SupporterTableComponent,
    },
    {
      path: 'piece-table',
      component: PieceTableComponent,
    },
    {
      path: 'user-table',
      component: UserTableComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  TablesComponent,
  CategoryTableComponent,
  BannerTableComponent,
  CompanyTableComponent,
  PriceTableComponent,
  ProducerTableComponent,
  RequestTableComponent,
  SellerTableComponent,
  StandardTableComponent,
  SupporterTableComponent,
  PieceTableComponent,
  UserTableComponent,
];
