import { Component, ViewChild} from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProductosPage } from '../pages/productos/productos';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('nav') nav:Nav;
  rootPage:any = HomePage;
  pages:Array<{titulo:string,componente:any,icon:string}>

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public menu:MenuController,private afAuth: AngularFireAuth) {
    this.menu.swipeEnable(true,"sideMenu");
    this.pages = [
      {titulo:"Inicio",componente:HomePage,icon:"home"},
      {titulo:"Mi Perfil",componente:PerfilPage,icon:"person"},
      {titulo:"Productos",componente:ProductosPage,icon:"basket"},
      //{titulo:"Acerca de",componente:AcercaPage,icon:"information-circle"}
    ]
    this.afAuth.authState.subscribe(auth => {
      if(!auth)
        this.rootPage = LoginPage;
      else
        this.rootPage = HomePage;
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  gotoPage(page){
    this.menu.close();
    this.nav.setRoot(page);
  }

}
