import { NgModule } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HraderComponent } from './commponents/hrader//hrader.component';
import { FooterComponent } from './commponents/footer/footer.component';
import { SighInComponent } from './commponents/sigh-in/sigh-in.component';
import { SighUpComponent } from './commponents/sigh-up/sigh-up.component';


//pages
import { HomeComponent } from './pages/home/home.component';
import { ActionsComponent } from './pages/actions/actions.component';
import { RolesComponent } from './pages/roles/roles.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { CoodInfoComponent } from './pages/good-info/good-info.component';
import { ActionInfoComponent } from './pages/action-info/action-info.component';
import { GoodsPageComponent } from './pages/goods-page/goods-page.component';

//admin
import { AdminComponent } from './admin//admin.component';
import { ActionComponent } from './admin/action/action.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { GoodsComponent } from './admin/goods/goods.component';
import { OrderComponent } from './admin/order/order.component';

import { UserCabinetComponent } from './user-cabinet/user-cabinet.component';
import { PersonalDataComponent } from './user-cabinet/personal-data/personal-data.component';
import { OrderHistoryComponent } from './user-cabinet/order-history/order-history.component';
import { PasswordChangeComponent } from './user-cabinet/password-change/password-change.component';
import { BasketComponent } from './commponents/basket/basket.component';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';






@NgModule({
  declarations: [
    AppComponent,
    HraderComponent,
    FooterComponent,
    HomeComponent,
    ActionsComponent,
    RolesComponent,
    DeliveryComponent,
    AboutUsComponent,
    AdminComponent,
    ActionComponent,
    CategoriesComponent,
    GoodsComponent,
    OrderComponent,
    CoodInfoComponent,
    ActionInfoComponent,
    UserCabinetComponent,
    PersonalDataComponent,
    OrderHistoryComponent,
    PasswordChangeComponent,
    GoodsPageComponent,
    SighUpComponent,
    SighInComponent,
    BasketComponent,




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatSliderModule,
    MatDialogModule,
    providePerformance(() => getPerformance()),
    provideRemoteConfig(() => getRemoteConfig())
  ],
  providers: [
    ScreenTrackingService, UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
