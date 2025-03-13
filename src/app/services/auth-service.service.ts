import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1';

  constructor() {}

  async register(
    nombre: string,
    apellido: string,
    peso: number,
    estatura: number,
    email: string,
    password: string
  ) {
    try {
      console.log('Antes de enviar la solicitud al backend');

      const response = await axios.post(`${this.apiUrl}/register`, {
        nombre,
        apellido,
        peso,
        estatura,
        email,
        password
      });

    console.log('Respuesta recibida del backend:', response.data);

      return response.data;
    } catch (error: any) {
      
    console.log('Entró al catch en register');
    console.error('Error completo:', error);
      return this.handleError(error);
    }
  }

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
  

  async verifyCode(email: string, codigo: string) {
    try {
      const response = await axios.post(`${this.apiUrl}/verificar-codigo`, { email, codigo });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      return response.data;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async requestVerificationEmail(email: string) {
    try {
      const response = await axios.post(`${this.apiUrl}/reenviar`, { email });
      return response.data;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async forgotPassword(email: string) {
    try {
      const response = await axios.post(`${this.apiUrl}/forgot-password`, { email });
      return response.data;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async resetPassword(email: string, password: string, token: string) {
    try {
      const response = await axios.post(`${this.apiUrl}/reset-password`, { email, password, token });
      return response.data;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async logout() {
    try {
      localStorage.removeItem('token');

      await axios.post(`${this.apiUrl}/logout`, {}, {
        headers: { Authorization: `Bearer ${this.getToken()}` }
      });

    } catch (error: any) {
      console.warn('Error al cerrar sesión', error);
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

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
