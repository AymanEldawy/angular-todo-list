import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TodosComponent } from './components/todos/todos.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, TodosComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-todo-list';
  today = new Date()
  isView = true;
}
