import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1';

  constructor() {}

  async register(nombre: string, apellido: string, peso: number, estatura: number, email: string, password: string) {
    try {
      const response = await axios.post(`${this.apiUrl}/register`, { 
        nombre, 
        apellido, 
        peso, 
        estatura, 
        email, 
        password 
      });

      return response.data;
    } catch (error: any) {
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
      return this.handleError(error);
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

  private handleError(error: any) {
    if (error.response) {
      const status = error.response.status;
      const responseData = error.response.data;

      if (status === 400 || status === 422) {
        let mensaje = responseData.mensaje || 'Error en la validación';
        let detalles = Object.values(responseData.errores || {}).flat().join(' ');
        throw { type: 'validation', message: `${mensaje}: ${detalles}` };
      }

      if (status === 401 || status === 403) {
        localStorage.removeItem('token');
        window.location.href = '/guest/login'; // Redirigir al login
        throw { type: 'auth', message: responseData.mensaje || 'Sesión no válida' };
      }

      throw { type: 'server', message: 'Error inesperado en el servidor.' };
    } else {
      throw { type: 'network', message: 'Error de conexión con el servidor.' };
    }
  }
}
