import { Routes } from '@angular/router';
import { LoginComponent } from './pages/user/login/login.component';
import { LayoutComponent } from './pages/user/layout/layout.component';
import { DashboardComponent } from './pages/user/dashboard/dashboard.component';

export const routes: Routes = [
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
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    },
];
