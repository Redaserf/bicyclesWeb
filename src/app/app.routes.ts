import { Component } from '@angular/core';
import { Routes } from '@angular/router';
//Componentes
import { GuestLayoutComponent } from './pages/guest/layout/guest-layout/guest-layout.component';
import { HomeComponent } from './pages/guest/home/home.component';
import { AuthLayoutComponent } from './pages/guest/auth-layout/auth-layout.component';

export const routes: Routes = [

    //guest
    {
        path: '',
        component: GuestLayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent
                //componente de registro
            },
        //     {
        //         path: 'login',
        //         component: CardComponent
        //         //componente de login
        //     }
        ]
    },
    // {
    //     path: 'auth',
    //     component: AuthLayoutComponent,
    //     children: [
    //         {
    //             path: 'login',
    //             // component: CardComponent
    //             //componente de login
    //         },
    //         {
    //             path: 'registro',
    //             // component: CardComponent
    //             //componente de registro
    //         }
    //     ]
    // }

];
