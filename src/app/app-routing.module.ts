import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ActionsComponent } from './pages/actions/actions.component'
import { RolesComponent } from './pages/roles/roles.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { CoodInfoComponent } from './pages/good-info/good-info.component';
import { ActionInfoComponent } from './pages/action-info/action-info.component';
import { GoodsPageComponent } from './pages/goods-page/goods-page.component';


import { GoodsInfoResolver } from './shared/services/goods-info/goods-info.resolver';
import { ActionInfoResolver } from './shared/services/action-info/action-info.resolver';
import { AuthGuard } from './shared/guards/auth.guard';

import { SighInComponent } from './commponents/sigh-in/sigh-in.component';

import { AdminComponent } from './admin/admin.component';
import { ActionComponent } from './admin/action/action.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { GoodsComponent } from './admin/goods/goods.component';
import { OrderComponent } from './admin/order/order.component';

import { UserCabinetComponent } from './user-cabinet/user-cabinet.component';
import { OrderHistoryComponent } from './user-cabinet/order-history/order-history.component';
import { PersonalDataComponent } from './user-cabinet/personal-data/personal-data.component';
import { PasswordChangeComponent } from './user-cabinet/password-change/password-change.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home/: link', component: HomeComponent },
  {
    path: 'home/: link/:id', component: CoodInfoComponent, resolve: {
      goodInfo: GoodsInfoResolver
    }
  },
  { path: 'action', component: ActionsComponent },
  {
    path: 'action/:id', component: ActionInfoComponent, resolve: {
      actionInfo: ActionInfoResolver
    }
  },
  { path: 'roles/: link', component: RolesComponent },
  {
    path: 'roles/: link/:id', component: CoodInfoComponent, resolve: {
      goodInfo: GoodsInfoResolver
    }
  },

  { path: 'goodsPage/:linnk', component: GoodsPageComponent },
  {
    path: 'goodsPage/:linnk/: id', component: GoodsPageComponent, resolve: {
      goodInfo: GoodsInfoResolver
    }
  },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'login', component: SighInComponent },
  {
    path: 'user-cabinet', component: UserCabinetComponent, canActivate: [AuthGuard], children: [
      { path: 'personalData', component: PersonalDataComponent },
      { path: 'orderHistory', component: OrderHistoryComponent },
      { path: 'passwordChange', component: PasswordChangeComponent },
      { path: '', pathMatch: 'full', redirectTo: 'personalData' }
    ]
  },
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
      { path: 'action', component: ActionComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'goods', component: GoodsComponent },
      { path: 'order', component: OrderComponent },
      { path: '', pathMatch: 'full', redirectTo: 'action' }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
