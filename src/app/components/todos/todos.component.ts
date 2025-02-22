import { Component, computed, Input } from '@angular/core';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { ITodo } from '../../interfaces/todo.interface';
import { CommonModule } from '@angular/common';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { StorageService } from './../../service/storage.service';
import { TODO_DATA } from '../../utils/TODO-DATA';
import { TodoService } from './todo.service';
@Component({
  selector: 'app-todos',
  imports: [TodoCardComponent, CommonModule, AddTodoComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent {
  @Input() isView!: boolean;
  openForm: boolean = false;
  selectedItem!: null | ITodo;
  isFiltered: boolean = false;
  constructor(private storage: StorageService, private todos: TodoService) {
    console.log("🚀 ~ TodosComponent ~ constructor ~ todos:", todos.data)
  }
  get bookmarksCount() {
    return this.todos.data.filter((c) => c.is_bookmark).length;
  }

  get filteredTodos(): ITodo[] {
    return this.todos.data.filter((c) => {
      if (this.isFiltered) return c.is_bookmark;
      else return c;
    });
  }

  get todosData() {
    return this.todos.data;
  }

  trackByTodoId(index: number, todo: ITodo): number {
    return todo.id;
  }

  toggleForm() {
    this.openForm = !this.openForm;
  }

  onSelectItem(item: ITodo) {
    this.selectedItem = item;
    this.toggleForm();
  }

  onRemoveSelect() {
    this.selectedItem = null;
  }

  toggleTodoBookmark(id: number) {
    this.todos.toggleTodoBookmark(id);
  }
}
