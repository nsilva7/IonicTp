import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Producto } from '../../pages/productos/producto'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
/*
  Generated class for the ProductosServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductosServiceProvider {
  private productosUrl = "https://tarea-fe.firebaseio.com/api/productos.json";
  private lista=[];
  private productos=[];
  constructor(public http: Http) {}
  getProductos() {
    return this.http.get(this.productosUrl).map(res => res.json(),error => console.log(error)).toPromise();
  }

}
