import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodo } from '../../interfaces/todo.interface';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TodoService } from '../todos/todo.service';

@Component({
  selector: 'app-todo-card',
  imports: [RouterModule, CommonModule],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
})
export class TodoCardComponent {
  @Input() isView!: boolean;
  @Input() todo!: ITodo;
  @Output() select = new EventEmitter();
  // @Output() toggleTodoBookmark = new EventEmitter<number>();
  // @Output() deleteTodo = new EventEmitter<number>();

  constructor(private todos: TodoService) {}

  onSelectItem() {
    this.select.emit();
  }

  toggleBookmark(id: number) {
    this.todos.toggleTodoBookmark(id);
  }

  onDelete(id: number) {
    this.todos.deleteNote(id);
  }
}
