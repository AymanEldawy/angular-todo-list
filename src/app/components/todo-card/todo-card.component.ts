import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodo } from '../../interfaces/todo.interface';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-todo-card',
  imports: [RouterModule],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
})
export class TodoCardComponent {
  @Input() isView!: boolean;
  @Input() todo!: ITodo;
  @Output() select = new EventEmitter();
  @Output() toggleTodoBookmark = new EventEmitter();

  // constructor() {
  //   console.log(this.todo);
  // }

  onSelectItem() {
    this.select.emit();
  }

  toggleBookmark(id: number) {
    this.toggleTodoBookmark.emit(id);
  }
}
