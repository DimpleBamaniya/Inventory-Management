import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { LayoutComponent } from './pages/layout/layout.component';

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
        path: 'dashbourd',
        component: DashboardComponent
    }, 
    {
        path: 'user',
        loadChildren: () => import('../app/pages/user/user.module').then(m => m.UserModule),
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'logout',
                component: LogoutComponent
            },
        ]
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    },
];
