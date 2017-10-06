import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform , ViewController} from 'ionic-angular';
import { Firebase } from '@ionic-native/firebase';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Producto  } from '../../clases/producto';
import { CarritoProvider } from '../../providers/carrito/carrito';
import { Carrito, Item } from '../../clases/carrito';
import { ContenidoModal } from './modal'
import { UserProvider } from '../../providers/user/user'
import { User } from '../../clases/user';
import { ProductosServiceProvider } from '../../providers/productos-service/productos-service';
/**
 * Generated class for the ProductosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productos',
  templateUrl: 'productos.html',
})
export class ProductosPage {
  private lista = [];
  private lista2 = [];
  private user:User;
  constructor(public navCtrl: NavController, public navParams: NavParams,private psp: ProductosServiceProvider, public modalCtrl: ModalController, public usp: UserProvider) {
    psp.getProductos().then(res => {
      this.lista = res;
      for(let key in this.lista) {
        this.lista2.push(this.lista[key]);
      }
    });
    this.user= new User;
    this.usp.getUser().subscribe(user => this.user.nombre = user.displayName);
  }
  abrirModal(producto){
      console.log(producto);
      let modal = this.modalCtrl.create(ContenidoModal, producto);
      modal.present();
  }
  ionViewDidLoad() {
  }
}
