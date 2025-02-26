import { Component } from '@angular/core';
import { Routes } from '@angular/router';
//Componentes
import { GuestLayoutComponent } from './pages/guest/layout/guest-layout/guest-layout.component';
import { HomeComponent } from './pages/guest/home/home.component';
import { AuthLayoutComponent } from './pages/guest/auth-layout/auth-layout.component';
import { LoginComponent } from './pages/guest/login/login.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/guest/register/register.component';

export const routes: Routes = [

    //rutas de guest (usuario no autenticado)
    {
        path: '',
        component: GuestLayoutComponent,
        pathMatch: 'full',
        children: [
            {
                path: '',
                component: HomeComponent,
            }
        ]
    },

     {
        path: 'auth',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'registro',
                component: RegisterComponent
            }
        ]
    }

];
