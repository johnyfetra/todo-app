import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'todos', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'todos', loadChildren: () => import('./features/todos/todos.routes').then(m => m.TODOS_ROUTES) },
  { path: '**', redirectTo: 'todos' }
];
