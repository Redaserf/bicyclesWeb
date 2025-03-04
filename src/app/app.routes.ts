import { Component } from '@angular/core';
import { Routes } from '@angular/router';
//Componentes
import { GuestLayoutComponent } from './pages/guest/layout/guest-layout/guest-layout.component';
import { HomeComponent } from './pages/guest/home/home.component';
import { AuthLayoutComponent } from './pages/guest/auth-layout/auth-layout.component';
import { LoginComponent } from './pages/guest/login/login.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/guest/register/register.component';
import { RecorridoComponent } from './pages/user/recorrido/recorrido.component';
import { UserLayoutComponent } from './pages/user/user-layout/user-layout.component';
import { DashboardComponent } from './pages/user/dashboard/dashboard.component';
import { PerfilComponent } from './pages/user/perfil/perfil.component';
import { SidebarUserComponent } from './pages/user/sidebar-user/sidebar-user.component';
import { CodeVerificationComponent } from './pages/guest/code-verification/code-verification.component';

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

    // {
    //     path: 'dashboard',
    //     component: DashboardComponent,
    //     children: 
    //     [
    //         {path: '', redirectTo: 'recorrido', pathMatch: 'full'},
    //         {path: "recorrido", component: RecorridoComponent},
    //         {path: "user", component: UserLayoutComponent},
    //     ]
    // },

    {path: "sidebar", component: SidebarUserComponent},
    {path: "perfil", component: PerfilComponent},
    {path: "recorrido", component: UserLayoutComponent},
    {path: "codigo", component: CodeVerificationComponent},

];
