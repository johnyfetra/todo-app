import { Routes } from '@angular/router';
import { authGuard } from '../../core/auth.guard';
import { TodosComponent } from '../../pages/todos/todos.component';

export const TODOS_ROUTES: Routes = [
  { path: '', component: TodosComponent, canActivate: [authGuard] }
];


