import { Injectable } from '@angular/core';
import axios, { AxiosError, AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() { 
    this.axiosInstance = axios.create({
      baseURL: 'http://192.168.253.10:8000/api/v1',
      timeout: 1000,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  
    this.axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }
  
  public get(url: string) {
    return this.axiosInstance.get(url).catch(this.handleError);
  }
  
  public post(url: string, data: any) {
    return this.axiosInstance.post(url, data).catch(this.handleError);
  }
  
  public put(url: string, data: any) {
    return this.axiosInstance.put(url, data).catch(this.handleError);
  }
  
  public delete(url: string) {
    return this.axiosInstance.delete(url).catch(this.handleError);
  }
  
  private handleError(error: any) {
    console.error('Error en la petición:', error);
  
    if (error.response) {
      const status = error.response.status;
  
      switch (status) {
        case 400:
          console.warn('Error de validación:', error.response.data);
          return Promise.reject(error.response.data);
  
        case 401:
          return Promise.reject({ mensaje: 'No autorizado.' });
        case 403:
          console.warn('Sesión expirada o no autorizado. Redirigiendo al login...');
          localStorage.removeItem('token');
          return Promise.reject({ mensaje: 'Sesión expirada. Inicia sesión nuevamente.' });
  
        case 404:
          return Promise.reject({ mensaje: 'Recurso no encontrado.' });
  
        case 422:
          return Promise.reject({ errores: error.response.data.errors });
        case 500:
          return Promise.reject({ mensaje: 'Error interno del servidor. Intenta más tarde.' });
  
        default:
          return Promise.reject({ mensaje: 'Ocurrió un error inesperado. Intenta de nuevo.' });
      }
    }
  
    return Promise.reject({ mensaje: 'No se pudo conectar con el servidor. Verifica tu conexión.' });
  }
}
