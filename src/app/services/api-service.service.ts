import { Injectable } from '@angular/core';
import axios, { AxiosError } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1';

  constructor() {}

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  private getAuthHeaders() {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // Método para obtener datos con GET
  async getData(endpoint: string) {
    return this.request('get', endpoint);
  }

  // Método para enviar datos con POST
  async postData(endpoint: string, data: any) {
    return this.request('post', endpoint, data);
  }

  // Método para actualizar datos con PUT
  async updateData(endpoint: string, data: any) {
    return this.request('put', endpoint, data);
  }

  // Método para eliminar datos con DELETE
  async deleteData(endpoint: string) {
    return this.request('delete', endpoint);
  }

  // Método genérico para manejar peticiones HTTP
  private async request(method: 'get' | 'post' | 'put' | 'delete', endpoint: string, data: any = null) {
    try {
      const response = await axios({
        method,
        url: `${this.apiUrl}/${endpoint}`,
        data,
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  // Manejo de errores
  private handleError(error: AxiosError) {
    console.error('Error en la petición:', error);

    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 400:
          console.warn('Error de validación:', error.response.data);
          return Promise.reject(error.response.data);

        case 401:
        case 403:
          console.warn('Sesión expirada o no autorizado. Redirigiendo al login...');
          localStorage.removeItem('token');
          return Promise.reject({ mensaje: 'Sesión expirada. Inicia sesión nuevamente.' });

        case 404:
          return Promise.reject({ mensaje: 'Recurso no encontrado.' });

        case 500:
          return Promise.reject({ mensaje: 'Error interno del servidor. Intenta más tarde.' });

        default:
          return Promise.reject({ mensaje: 'Ocurrió un error inesperado. Intenta de nuevo.' });
      }
    }

    return Promise.reject({ mensaje: 'No se pudo conectar con el servidor. Verifica tu conexión.' });
  }
}
