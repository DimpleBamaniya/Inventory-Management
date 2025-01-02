import { Routes } from '@angular/router';
import { LoginComponent } from './pages/user/login/login.component';
import { LayoutComponent } from './pages/user/layout/layout.component';
import { DashboardComponent } from './pages/user/dashboard/dashboard.component';
import { UserDetailComponent } from './pages/user/user-detail/user-detail.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';

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
        path: 'user-detail/:id',
        component: UserDetailComponent
    },
    {
        path: 'user-list',
        component: UserListComponent
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    },
];
