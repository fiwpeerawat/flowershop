import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { RowProductShowComponent } from './component/row-product-show/row-product-show.component';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './component/home-page/home-page.component'
import { RouterModule, Routes } from '@angular/router';
import { CardPageComponent } from './component/card-page/card-page.component';
import { CardPageItemComponent } from './component/card-page-item/card-page-item.component';
import { ProductShowItemComponent } from './component/product-show-item/product-show-item.component';
import { DetailItemPageComponent } from './component/detail-item-page/detail-item-page.component';
import { MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ShowProductPageComponent} from './component/show-product-page/show-product-page.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { ResigterPageComponent } from './component/resigter-page/resigter-page.component';
import { ResetpasswordPageComponent } from './component/resetpassword-page/resetpassword-page.component';
import { ListOrderPageComponent } from './component/list-order-page/list-order-page.component';
import { HowToUsePageComponent } from './component/how-to-use-page/how-to-use-page.component';
import { BillOrderPageComponent } from './component/bill-order-page/bill-order-page.component';
import { PaymentPageComponent } from './component/payment-page/payment-page.component';
import { ContactPageComponent } from './component/contact-page/contact-page.component';
import { PrebootModule } from 'preboot';
import { HttpModule , Http } from '@angular/http';
import { ViewAfterPaymentComponent } from './component/view-after-payment/view-after-payment.component';
import { SearchProductComponent } from './component/search-product/search-product.component';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';

// Service
import { AuthService } from './services/auth.service';
import { GetProductHomepageService } from "./services/get-product-homepage.service";
import { GetAllproductInGroupService } from "./services/get-allproduct-in-group.service"
import { GetProductDetailService } from "./services/get-product-detail.service"
import { ProductIncardNoAuthService } from "./services/product-incard-no-auth.service"
import { BillConfirmService } from "./services/bill-confirm.service"
import { AfterPaymentService } from './services/after-payment.service';
import { SearchService } from './services/search.service';
// Guard
import { AuthGuard } from './guards/auth.guard';









 

// Config Firebase
export const firebaseConfig = {
    apiKey: "AIzaSyBWmNNnMQFIiYwNVgP9b5GHwNcBSEZlzqs",
    authDomain: "flower-shop-d872b.firebaseapp.com",
    databaseURL: "https://flower-shop-d872b.firebaseio.com",
    projectId: "flower-shop-d872b",
    storageBucket: "flower-shop-d872b.appspot.com",
    messagingSenderId: "233347429534"
 };

const appRoutes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "Card", component: CardPageComponent },
  { path: "Detail-item", component: DetailItemPageComponent },
  { path: "Allproduct", component: ShowProductPageComponent },
  { path: "Login", component: LoginPageComponent },
  { path: "Resigter", component: ResigterPageComponent },
  { path: "Resetpassword", component: ResetpasswordPageComponent },
  { path: "ListOrder", component: ListOrderPageComponent , canActivate: [AuthGuard]  },
  { path: "HowToUse", component: HowToUsePageComponent  },
  { path: "BillOrder", component: BillOrderPageComponent,canActivate: [AuthGuard] },
  { path: "Payment", component: PaymentPageComponent },
  { path: "Contact", component: ContactPageComponent },
  { path: "AfterPayment", component: ViewAfterPaymentComponent ,canActivate: [AuthGuard] },
  { path: "Search", component: SearchProductComponent },
  
 
//, canActivate: [AuthGuard] 
]

@NgModule({
  declarations: [
    AppComponent,
    RowProductShowComponent,
    HomePageComponent,
    CardPageComponent,
    CardPageItemComponent,
    ProductShowItemComponent,
    DetailItemPageComponent,   
    ShowProductPageComponent,
    LoginPageComponent,
    ResigterPageComponent,
    ResetpasswordPageComponent,
    ListOrderPageComponent,
    HowToUsePageComponent,
    BillOrderPageComponent,
    PaymentPageComponent,
    ContactPageComponent,
    ViewAfterPaymentComponent,
    SearchProductComponent,



  ],
  imports: [
    
    BrowserModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatSelectModule,    
    ReactiveFormsModule,
    LazyLoadImageModule,
    HttpModule,
    AngularFireAuthModule,
    AngularFirestoreModule,   
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(appRoutes),
    PrebootModule.withConfig({ appRoot: 'app-root' })
  ],
  providers: [
    AuthService, 
    AngularFireDatabase,
    AuthGuard,
    GetProductHomepageService,
    GetAllproductInGroupService,
    GetProductDetailService,
    ProductIncardNoAuthService,
    BillConfirmService,
    AfterPaymentService,
    SearchService,
  ],    
  bootstrap: [AppComponent]
})
export class AppModule { }
