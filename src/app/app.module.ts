import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ProductosPage, ContenidoModal } from '../pages/productos/productos';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { HttpModule } from '@angular/http';
import { ProductosServiceProvider } from '../providers/productos-service/productos-service';

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
    ContenidoModal
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProductosPage,
    ContenidoModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductosServiceProvider
  ]
})
export class AppModule {}
