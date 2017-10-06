import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ProductosPage } from '../pages/productos/productos';
import { ContenidoModal } from '../pages/productos/modal';
import { Facebook } from '@ionic-native/facebook';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpModule } from '@angular/http';
import { ProductosServiceProvider } from '../providers/productos-service/productos-service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { LoginPage } from '../pages/login/login';
import { UserProvider } from '../providers/user/user';
import { PerfilPage } from '../pages/perfil/perfil';
import { CheckoutPage } from '../pages/checkout/checkout';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { CarritoProvider } from '../providers/carrito/carrito';
import { CarritoComponent} from '../components/carrito/carrito';

export const firebaseConfig = {
  apiKey: "AIzaSyD2qjKQxPbLWtI2tnb4U8azGrm_aBrT6C4",
  authDomain: "tarea-fe.firebaseapp.com",
  databaseURL: "https://tarea-fe.firebaseio.com",
  projectId: "tarea-fe",
  storageBucket: "tarea-fe.appspot.com",
  messagingSenderId: "840459743682"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProductosPage,
    ContenidoModal,
    LoginPage,
    PerfilPage,
    CarritoComponent,
    CheckoutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    HttpModule,
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProductosPage,
    ContenidoModal,
    LoginPage,
    PerfilPage,
    CheckoutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    GoogleMaps,

    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductosServiceProvider,
    CarritoProvider,
    CarritoComponent
  ]
})
export class AppModule {}
