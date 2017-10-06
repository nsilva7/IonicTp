import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import {Producto} from '../../clases/producto';
import { Carrito, Item } from '../../clases/carrito';
import { UserProvider } from '../../providers/user/user';

/*
  Generated class for the CarritoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CarritoProvider {

  private carritosUrl = "https://tarea-fe.firebaseio.com/api/carritos.json";
   private carrito = new Carrito();
   private lista = [];
   private cid:string;
   private agregarProductoSource = new Subject<Item>();
   private asignarDueñoSource = new Subject<string>();
   private cambiosSource = new Subject<string>();
   private checkoutSource = new Subject<string>();

   agregarProducto$ = this.agregarProductoSource.asObservable();
   asignarDueño$ = this.asignarDueñoSource.asObservable();
   cambios$ = this.cambiosSource.asObservable();
   checkout$ = this.cambiosSource.asObservable();


  constructor(private http: Http,private userService:UserProvider) {
  }

  agregarAlCarrito(item:Item) {
    if(item.producto.stock >= item.cantidad){
      this.userService.getUser().subscribe(user => {
        this.getCarrito(user.uid).then(res => {
          for(let key in res){
            this.carrito = res[key];
            this.cid = key;
            break;
          }
          this.carrito.items.push(item);
          this.carrito.cantidadItems= +this.carrito.cantidadItems+item.cantidad*1;
          this.http.put("https://tarea-fe.firebaseio.com/api/carritos/"+this.cid+".json",this.carrito).subscribe();
          this.agregarProductoSource.next(item);
      });
    });
    }else {
      throw new Error('No hay stock suficiente');
    }
  }

  getCarrito(uid:string){
      return this.http.get(this.carritosUrl+"?orderBy=\"usuario\"&equalTo=\""+uid+"\"").map(res =>
        res.json(),error =>
          console.log(error)
      ).toPromise();
      }

  crearCarrito(uid:string) {
      let item = new Item();
      item.cantidad = 0;
      item.producto = new Producto();
      this.carrito.cantidadItems = 0;
      this.carrito.montoTotal= 0;
      this.carrito.items.push(item);
      this.carrito.usuario = uid;
      this.http.post(this.carritosUrl,this.carrito).subscribe(data => {
        console.log("carrito creado");
      }
      );
    }

    checkout() {
        this.checkoutSource.next("checkout");
    }

  tieneCarrito(uid:string) {
    this.http.get(this.carritosUrl+"?orderBy=\"usuario\"&equalTo=\""+uid+"\"").subscribe(res => {
    if (res.text() == "{}" ) {
      this.crearCarrito(uid);
      console.log("notieneCarrito");
    }else {
      this.carrito = res.json();
      console.log("tiene carrito");
    }
      });

    }


  vaciarCarrito(carrito:Carrito){
    carrito.cantidadItems= 0;
    while( carrito.items.length != 0) {
      carrito.items.pop();
    }
    carrito.montoTotal = 0;
    console.log(carrito);
    localStorage.setItem("carrito",JSON.stringify(carrito));
      let key = localStorage.getItem("carritoId");
    console.log(`https://tarea-fe.firebaseio.com/api/carritos/${key}`);
    this.http.put(`https://tarea-fe.firebaseio.com/api/carritos/${key}.json`,carrito).subscribe();
  }

}
