import { Routes } from '@angular/router';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { authGuard } from './core/guards/auth.guard';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';

export const routes: Routes = [
  // TODO: Use module lazy loading
  {
    path: 'auth',
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/dashboard/dashboard/dashboard.module').then(
        (m) => m.DashboardModule,
      ),
  },
  {
    path: '',
    redirectTo: 'auth/sign-in',
    pathMatch: 'full',
  },
  { path: '**', component: SignInComponent },
];
