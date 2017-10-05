import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform , ViewController} from 'ionic-angular';
import { Firebase } from '@ionic-native/firebase';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Producto, Data } from '../productos/producto';
import { ProductosServiceProvider } from '../../providers/productos-service/productos-service'
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
  constructor(public navCtrl: NavController, public navParams: NavParams,private psp: ProductosServiceProvider, public modalCtrl: ModalController) {
    psp.getProductos().then(res => {
      this.lista = res;
      for(let key in this.lista) {
        this.lista2.push(this.lista[key]);
      }
    });
  }
  abrirModal(producto){
      console.log(producto);
      let modal = this.modalCtrl.create(ContenidoModal, producto);
      modal.present();
  }
  ionViewDidLoad() {
  }
}
@Component({
template: `
  <ion-header>
  <ion-toolbar>
    <ion-title>
      Detalles
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span ion-text color="primary" showWhen="ios">Cancel</span>
        <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
  </ion-header>
  <ion-content>
  <ion-list>
      <ion-item>
        <ion-avatar item-start>
          <img src="{{productoSeleccionado.foto[0]}}">
        </ion-avatar>
        <h2>{{productoSeleccionado.nombre}}</h2>
      </ion-item>
      <ion-item>
        <img src={{fotoActual}}/>
      </ion-item>
      <ion-item>
        <ion-thumbnail item-start *ngFor = "let foto of productoSeleccionado.foto" (click)="cambiarFoto(foto)">
          <img src={{foto}}>
        </ion-thumbnail>
      </ion-item>
  

      <ion-item>
        <p>Descripcion: {{productoSeleccionado.descripcion}}</p>
      </ion-item>
      <ion-item>
        <p>Precio: {{productoSeleccionado.precio}} $</p>
      </ion-item>
      <ion-item>
        <p>Stock: {{productoSeleccionado.stock}}</p>
      </ion-item>
      <ion-item>
        <p>Dimensiones: {{productoSeleccionado.dimensiones}} m3</p>
      </ion-item>
      <ion-item>
        <p>Peso: {{productoSeleccionado.peso}}Kg</p>
      </ion-item>
      <ion-item>
        <p>Caracteristicas: <br>{{productoSeleccionado.caracteristicas}}</p>
      </ion-item>
      </ion-list>
  </ion-content>
`
})
export class ContenidoModal {
  productoSeleccionado;
  fotoActual;
  private lista = [];
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public params: NavParams,private psp: ProductosServiceProvider, public modalCtrl: ModalController) {
    this.productoSeleccionado = this.params.data;
    this.fotoActual = this.productoSeleccionado.foto[0];
  }
  cambiarFoto(foto){
    this.fotoActual = foto;
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
