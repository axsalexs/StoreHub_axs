import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  registrar(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro/`, userData);
  }

  login(credenciales: any): Observable<any> {
    // Cambiamos /token/ por /login/ para que coincida con el backend
    return this.http.post(`${this.apiUrl}/login/`, credenciales);
    // ------------------------------------------------------------------------------------
  }

  guardarToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  obtenerToken() {
    return localStorage.getItem('access_token');
  }


  // Método privado que solo tú servicio usa
  private getHeaders() {
    const token = this.obtenerToken();
    return { 'Authorization': `Bearer ${token}` };
  }

  registrarProducto(productoData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/productos/`, productoData, { headers: this.getHeaders() });
  }

  registrarCategoria(categoriaData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/categorias/`, categoriaData, { headers: this.getHeaders() });
  }

  listarCategorias(): Observable<any> {
  const token = this.obtenerToken();
  // Forzamos el header de autorización explícitamente
  const headers = { 'Authorization': `Bearer ${token}` };
  return this.http.get(`${this.apiUrl}/categorias/`, { headers });
}


}

//comentario prueba git
