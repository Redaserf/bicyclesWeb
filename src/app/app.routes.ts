import { Routes } from '@angular/router';

import { FormLoginGuard } from './guards/form-login.guard'; 
import { FormRegisterGuard } from './guards/form-register.guard';
import { GuestHomeComponent } from './components/guest/guest-home/guest-home.component';
import { LoginComponent } from './components/guest/login/login.component';
import { RegisterComponent } from './components/guest/register/register.component';
import { CodeVerificationComponent } from './components/guest/code-verification/code-verification.component';
import { ResendCodeComponent } from './components/guest/resend-code/resend-code.component';
import { UserLayoutComponent } from './components/layouts/user-layout/user-layout.component';
import { UserHomeComponent } from './components/user/user-home/user-home.component';
import { UserRecorridoComponent } from './components/user/user-recorrido/user-recorrido.component';
import { UserBicicletasComponent } from './components/user/user-bicicletas/user-bicicletas.component';
import { UserPerfilComponent } from './components/user/user-perfil/user-perfil.component';
import { UserRecorridoshechosComponent } from './components/user/user-recorridos-hechos/user-recorridos-hechos.component';
import { UserEstadisticasComponent } from './components/user/user-estadisticas/user-estadisticas.component';
import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';
import { AdminPerfilComponent } from './components/administrador/admin-perfil/admin-perfil.component';
import { AdminEstadisticasComponent } from './components/administrador/admin-estadisticas/admin-estadisticas.component';
import { TablaUserComponent } from './components/administrador/tablas/tabla-user/tabla-user.component';
import { TablaAdminComponent } from './components/administrador/tablas/tabla-admin/tabla-admin.component';
import { TablaBicisComponent } from './components/administrador/tablas/tabla-bicis/tabla-bicis.component';
import { TablaRecorridoComponent } from './components/administrador/tablas/tabla-recorrido/tabla-recorrido.component';
import { TablaGenericaComponent } from './components/administrador/tablas/tabla-generica/tabla-generica.component';
import { GuestLayoutComponent } from './components/layouts/guest-layout/guest-layout.component';
import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout.component';

export const routes: Routes = [

    // =========[ Auth ]=========

    {
        path: 'auth',
        component: AuthLayoutComponent,
        children: [
            {path: '', redirectTo: 'login', pathMatch: 'full'},
            {path: 'login', component: LoginComponent, canDeactivate:[FormLoginGuard]},
            {path: 'register', component: RegisterComponent, canDeactivate: [FormRegisterGuard]},
            {path: 'code-verification', component: CodeVerificationComponent},
            {path: 'resend-code', component: ResendCodeComponent},
        ]
    },

    // =========[ Guest ]=========

    { path: '', component: GuestLayoutComponent, pathMatch: 'full'},
    { path: 'home', component: GuestLayoutComponent, pathMatch: 'full'},

    // =========[ User ]=========

    {
        path:"user",
        component:UserLayoutComponent,
        children:[
            {path: '', redirectTo: 'home', pathMatch: 'full'},
            {path:"home", component: UserHomeComponent},
            {path:"recorridos", component: UserRecorridoComponent},
            {path:"bicicletas", component: UserBicicletasComponent},
            {path:"perfil", component: UserPerfilComponent},
            {path:"recorridos-realizados", component: UserRecorridoshechosComponent},
            {path:"estadisticas", component: UserEstadisticasComponent},
        ]
    },

    // =========[ Admin ]=========
    
    {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
            {path: '', redirectTo: 'home', pathMatch: 'full'},
            {path: 'home',component: AdminPerfilComponent}, // de momento este porque no hay un 'home' como tal asdfasdh
            {path: 'perfil',component: AdminPerfilComponent},
            {path: 'estadisticas',component: AdminEstadisticasComponent},
            {path: 'usuarios',component: TablaUserComponent},
            {path: 'administradores',component: TablaAdminComponent},
            {path: 'bicicletas',component: TablaBicisComponent},
            {path: 'recorridos',component: TablaRecorridoComponent}, // basta de reirse chicos
            {path: 'other-stuff',component: TablaGenericaComponent},
        ]
    },
];
