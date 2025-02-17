import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TodosComponent } from './components/todos/todos.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, TodosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-todo-list';
  today = new Date().toLocaleDateString('en-UK');
  isView = true;
}
