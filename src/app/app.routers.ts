import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { LoginGardGuard } from './services/gards/login-gard.guard';



export const appRoutes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    {
        path: '',
        canActivate: [LoginGardGuard],
        loadChildren: () => import('./pages/pages.routers').then(m => m.pagesRoutes)
    },
    { path: '**', component: NopagefoundComponent }
];

// export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
