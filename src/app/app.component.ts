import { Component, ViewChild} from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProductosPage } from '../pages/productos/productos';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../pages/home/home';
import { CheckoutPage } from '../pages/checkout/checkout';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { CarritoProvider } from '../providers/carrito/carrito';
import { CarritoComponent } from '../components/carrito/carrito';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('nav') nav:Nav;
  rootPage:any = HomePage;
  pages:Array<{titulo:string,componente:any,icon:string}>

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public menu:MenuController,private afAuth: AngularFireAuth,private carritoService:CarritoProvider,private carritoComp:CarritoComponent) {
    this.menu.swipeEnable(true,"sideMenu");
    this.pages = [
      {titulo:"Inicio",componente:HomePage,icon:"home"},
      {titulo:"Mi Perfil",componente:PerfilPage,icon:"person"},
      {titulo:"Productos",componente:ProductosPage,icon:"basket"},
      {titulo:"Checkout",componente:CheckoutPage,icon:"information-circle"}
    ]
    this.afAuth.authState.subscribe(auth => {
      if(!auth) {
        this.rootPage = LoginPage;
      } else {
        this.carritoService.tieneCarrito(this.afAuth.auth.currentUser.uid);
        this.carritoComp.uid= this.afAuth.auth.currentUser.uid;
        this.rootPage = HomePage;
      }


    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngOnInit(){
    this.carritoService.cambios$.subscribe(res => {
      this.afAuth.authState.subscribe(auth => {
        this.carritoService.getCarrito(auth.uid).then(res => {
          for(let key in res){
            this.carritoComp.carrito = res[key];
            break;
          }
      });
    });
      console.log("se actualizo el carrito");
    })
  }
  gotoPage(page){
    this.menu.close();
    this.nav.setRoot(page);
  }

}
