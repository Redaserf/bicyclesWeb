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
import { TablaUsuariosComponent } from './pages/admin/tablas/tabla-usuarios/tabla-usuarios.component';
import { TablaAdministradoresComponent } from './pages/admin/tablas/tabla-administradores/tabla-administradores.component';
import { TablaBicicletasComponent } from './pages/admin/tablas/tabla-bicicletas/tabla-bicicletas.component';
import { TablaRecorridosComponent } from './pages/admin/tablas/tabla-recorridos/tabla-recorridos.component';
import { TablaGenericaComponent } from './pages/admin/tablas/tabla-generica/tabla-generica.component';
import { ResendCodeComponent } from './pages/guest/resend-code/resend-code.component';

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
    {path: "resend", component: ResendCodeComponent},


    // Tablas (admin)
    {path: "usuarios", component: TablaUsuariosComponent},
    {path: "administradores", component: TablaAdministradoresComponent},
    {path: "bicicletas", component: TablaBicicletasComponent},
    {path: "recorridos", component: TablaRecorridosComponent},
    {path: "generica", component: TablaGenericaComponent},
];
