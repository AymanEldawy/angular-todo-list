import { Routes } from '@angular/router';
import { TodosComponent } from './components/todos/todos.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: TodosComponent },
  { path: 'todos/add', component: AddTodoComponent },
  { path: 'todos/update/:id', component: AddTodoComponent },
  { path: '**', component: NotFoundComponent },
];
