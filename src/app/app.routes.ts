import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { GuestLayoutComponent } from './pages/guest/layout/guest-layout/guest-layout.component';
import { LoginComponent } from './pages/guest/login/login.component';

export const routes: Routes = [

    {path: '', component: GuestLayoutComponent, pathMatch: 'full'},
    {path: 'login', component: LoginComponent},

];
