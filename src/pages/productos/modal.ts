import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform , ViewController} from 'ionic-angular';
import { Firebase } from '@ionic-native/firebase';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Producto } from '../../clases/producto';
import { ProductosServiceProvider } from '../../providers/productos-service/productos-service'
import { UserProvider } from '../../providers/user/user'
import { User } from '../../clases/user';
import { CarritoProvider } from '../../providers/carrito/carrito';
import { Carrito, Item } from '../../clases/carrito';
@Component({
templateUrl: 'modal.html',
styles: ['productos.scss']
})
export class ContenidoModal {
  productoSeleccionado;
  fotoActual;
  puntuacion;
  nuevoComentario;
  nombreUsuaroio;
  cantidad;
  starIcon: string[] = new Array();
  private lista = [];
  private comentarios = [];
  private user:User;
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public params: NavParams,private psp: ProductosServiceProvider, public modalCtrl: ModalController, public usp: UserProvider, private carritoService:CarritoProvider) {
    this.productoSeleccionado = this.params.data;
    this.fotoActual = this.productoSeleccionado.foto[0];
    this.user= new User;
    this.usp.getUser().subscribe(user => this.user.nombre = user.displayName);
    var val = "star-outline";
    this.starIcon = [val,val,val,val,val];
    this.puntuacion = +0;
    console.log(this.productoSeleccionado.comentarios);
  }
  cambiarFoto(foto){
    this.fotoActual = foto;
  }
  pintarEstrellas(puntuacion){
    for(let x in this.starIcon){
      if(x > puntuacion){
        this.starIcon[x] = "star-outline"
      }else{
        this.starIcon[x] = "star"
      }
    }
    this.puntuacion = +(puntuacion)+1;
    console.log(this.puntuacion);
  }
  puntuar(){
    if(+(this.productoSeleccionado.puntuacion) != 0){
      this.puntuacion = (+(this.puntuacion) + +(this.productoSeleccionado.puntuacion))/2
    }
    this.psp.puntuar(this.productoSeleccionado.codigo, this.puntuacion);

  }
  addComentario(){
    var comentario = this.user.nombre+": "+this.nuevoComentario;
    this.psp.addComentario(comentario, this.productoSeleccionado.codigo);
  }
  agregarAlCarrito() {
    let item = new Item();
    item.cantidad = this.cantidad;
    item.producto = this.productoSeleccionado;
    this.carritoService.agregarAlCarrito(item);
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
