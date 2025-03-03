import { Component } from '@angular/core';
import { Routes } from '@angular/router';
//Componentes
import { GuestLayoutComponent } from './pages/guest/layout/guest-layout/guest-layout.component';
import { HomeComponent } from './pages/guest/home/home.component';
import { AuthLayoutComponent } from './pages/guest/auth-layout/auth-layout.component';
import { LoginComponent } from './pages/guest/login/login.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/guest/register/register.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { SidebarComponentUser } from './pages/user/sidebar/sidebar.component';
import { RecorridoComponent } from './pages/user/recorrido/recorrido.component';
import { UserLayoutComponent } from './pages/user/user-layout/user-layout.component';
import { DashboardComponent } from './pages/user/dashboard/dashboard.component';

export const routes: Routes = [

    //rutas de guest (usuario no autenticado)
    {
        path: '',
        component: GuestLayoutComponent,
        pathMatch: 'full',
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                component: HomeComponent,
            }
        ]
    },

    {
        path: 'auth',
        component: AuthLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'registro',
                component: RegisterComponent
            }
        ]
    },

    {
        path: 'dashboard',
        component: DashboardComponent,
        children: 
        [
            {path: '', redirectTo: 'recorrido', pathMatch: 'full'},
            {path: "recorrido", component: RecorridoComponent},
            {path: "user", component: UserLayoutComponent},
        ]
    },

];
