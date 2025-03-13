import { Injectable } from '@angular/core';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://127.0.0.1:8000/api/v1',
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

  public register(nombre: string, apellido: string, peso: number, estatura: number, email: string, password: string) {
    return this.axiosInstance.post('/register', { nombre, apellido, peso, estatura, email, password })
      .catch(this.handleError);
  }

  public login(email: string, password: string) {
    return this.axiosInstance.post('/login', { email, password })
      .catch(this.handleError);
  }

  public verifyCode(email: string, codigo: string) {
    return this.axiosInstance.post('/verificar-codigo', { email, codigo })
      .catch(this.handleError);
  }

  public requestVerificationEmail(email: string) {
    return this.axiosInstance.post('/reenviar', { email })
      .catch(this.handleError);
  }

  public forgotPassword(email: string) {
    return this.axiosInstance.post('/forgot-password', { email })
      .catch(this.handleError);
  }

  public resetPassword(email: string, password: string, token: string) {
    return this.axiosInstance.post('/reset-password', { email, password, token })
      .catch(this.handleError);
  }

  public logout() {
    localStorage.removeItem('token');

    return this.axiosInstance.post('/logout', {})
      .catch(this.handleError);
  }

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
