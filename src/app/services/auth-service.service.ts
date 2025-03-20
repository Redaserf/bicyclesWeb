import { Injectable } from '@angular/core';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://192.168.1.11:8000/api/v1';

  constructor() {}

  // ========================================================================================

  async register(
    nombre: string,
    apellido: string,
    peso: number,
    estatura: number,
    email: string,
    password: string,
    confirm_password: string
  ) {
    try {
      console.log('Antes de enviar la solicitud al backend');

      const response = await axios.post(`${this.apiUrl}/register`, {
        nombre,
        apellido,
        peso,
        estatura,
        email,
        password,
        confirm_password
      });

    console.log('Respuesta recibida del backend:', response.data);

      return response.data;
    } catch (error: any) {
      
    console.log('Entró al catch en register');
    console.error('Error completo:', error);
      return this.handleError(error);
    }
  }

  // ========================================================================================

  async login(email: string, password: string) {
    try {
      const response = await axios.post(`${this.apiUrl}/login`, { email, password });
  
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
  
      return response.data; 
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status;
        const responseData = error.response.data;
  
        if (status === 403 && responseData.redirect === 'verify_code') {
          throw { type: 'unverified', message: responseData.mensaje, email: responseData.email };
        }
  
        if (status === 401) {
          throw { type: 'auth', message: responseData.mensaje || 'Credenciales inválidas.' };
        }
  
        if (status === 422) {
          throw { type: 'validation', message: responseData.mensaje || 'Error en la validación.', errores: responseData.errores || {} };
        }
  
        throw { type: 'server', message: 'Error inesperado en el servidor.' };
      } else {
        throw { type: 'network', message: 'Error de conexión con el servidor.' };
      }
    }
  }

  // ========================================================================================

  async verifyCode(email: string, code: string) {
    console.log("Código a enviar:", code);

    try {
      const response = await axios.post(`${this.apiUrl}/verify-code`, {
        email,
        codigo: code
      });
  
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
  
      return response.data;
    } catch (error: any) {
      console.error('Error al verificar el código:', error);
      return this.handleError(error);
    }
  }  

  // ========================================================================================

  getAuthenticatedUser(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return new Observable(observer => observer.next(null));
    }

    return from(
      axios.get(`${this.apiUrl}/user`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => response.data)
      .catch(() => null)
    );
  }

  // ========================================================================================

  async resendVerificationEmail(email: string) {
    try {
      const response = await axios.post(`${this.apiUrl}/reenviar`, { email });
  
      return response.data;
    } catch (error: any) {
      console.error('Error al reenviar el correo:', error);
      return this.handleError(error);
    }
  }
  
  // ========================================================================================

  async logout() {
    const token = localStorage.getItem('token');
    if (!token) {
        return Promise.reject({ mensaje: 'No hay sesión activa.' });
    }

    try {
        const response = await axios.post(`${this.apiUrl}/logout`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });

        localStorage.removeItem('token');

        return response.data;
    } catch (error: any) {
        console.error('Error al cerrar sesión:', error);
        return this.handleError(error);
    }
  }

  // ========================================================================================

  // Manejo de errores
  private handleError(error: any) {
    console.error('AAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    console.error('Error en la petición:', error);
  
    if (error.response) {
      const status = error.response.status;
  
      // Manejo de errores de validación (código 422)
      if (status === 422 && error.response.data) {
        console.warn('Error de validación:', error.response.data);
        return Promise.reject({
          mensaje: error.response.data.mensaje || 'Error en la validación de los datos.',
          errores: error.response.data.errores || {}
        });
      }
  
      // Manejo de errores de validación (código 400)
      if (status === 400 && error.response.data) {
        console.warn('Error de validación:', error.response.data);
        return Promise.reject({
          mensaje: error.response.data.mensaje || 'Error en la validación de los datos.',
          errores: error.response.data.errores || {}
        });
      }
  
      // Si el token no es válido o ha expirado
      if (status === 401 || status === 403) {
        console.warn('Sesión expirada o no autorizado. Redirigiendo al login...');
        localStorage.removeItem('token');
        window.location.href = '/auth/login';
        return Promise.reject({ mensaje: 'Sesión expirada. Inicia sesión nuevamente.' });
      }
    }
  
    return Promise.reject({ mensaje: 'Ocurrió un error inesperado. Intenta de nuevo.' });
  }
  

}
