import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Producto } from '../../clases/producto'
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
  puntuar(codigo, puntuacion){
    let body = {puntuacion:puntuacion};
    console.log(body);
    this.http.get(this.productosUrl+"?orderBy=\"codigo\"&equalTo=\""+codigo+"\"").subscribe(res => {
      let data = res.json();
      for( let key in data){
        var url = "https://tarea-fe.firebaseio.com/api/productos/"+key+".json";
        this.http.patch(url, body).subscribe(res => console.log(res));
        break;
      }
    });
  }
  addComentario(nuevoComentario, codigo){
    this.http.get(this.productosUrl+"?orderBy=\"codigo\"&equalTo=\""+codigo+"\"").subscribe(res => {
      let data = res.json();
      for( let key in data){
        data[key].comentarios.push(nuevoComentario);
        var url = "https://tarea-fe.firebaseio.com/api/productos/"+key+"/comentarios"+".json";
        this.http.put(url, data[key].comentarios).subscribe(res => console.log(res));
        break;
      }
    });
  }
}
