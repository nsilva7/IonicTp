import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarritoProvider } from '../../providers/carrito/carrito';
import { CarritoComponent } from '../../components/carrito/carrito';
import { Carrito, Item } from '../../clases/carrito';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../clases/user';
/**
 * Generated class for the CheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  private carrito:Carrito;
  private user:User;
  constructor(public navCtrl: NavController, public navParams: NavParams,private carritoService:CarritoProvider,private userService:UserProvider) {
    this.user = new User;
    this.carrito = new Carrito;
    this.userService.getUser().subscribe(user => {
      this.user.nombre = user.displayName;
      this.carritoService.getCarrito(user.uid).then(res => {
        for(let key in res){
          this.carrito = res[key];
          break;
        }
        console.log("checkout"+this.carrito.items);
    });
  });
  }
  ngOnInit() {
    this.carritoService.checkout$.subscribe(() => {
      this.carrito = new Carrito;
    })
  }
  checkout() {
    this.carritoService.checkout();
  }

}
