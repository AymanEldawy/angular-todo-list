import { Component, computed, Input } from '@angular/core';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { ITodo } from '../../interfaces/todo.interface';
import { CommonModule } from '@angular/common';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { StorageService } from './../../service/storage.service';
import { TODO_DATA } from '../../utils/TODO-DATA';
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
  storage: any;
  todos: ITodo[] = TODO_DATA

  constructor(private s: StorageService) {
    this.storage = s;
  }

  ngOnInit() {
    this.todos = this.storage.getItem('TODOS') || this.todos;
  }

  get bookmarksCount() {
    return this.todos.filter((c) => c.is_bookmark).length;
  }

  get filteredTodos() {
    return this.todos.filter((c) => {
      if (this.isFiltered) return c.is_bookmark;
      else return c;
    });
  }

  toggleForm() {
    this.openForm = !this.openForm;
  }

  addNote(value: ITodo): { success: boolean } {
    
    this.todos.unshift({
      ...value,
      id: this.todos.length,
    });

    this.storage.setItem('TODOS', this.todos);

    return {
      success: true,
    };
  }

  updateNote(value: ITodo): { success: boolean } {
    let index = this.todos.findIndex((c) => c?.id == value?.id);
    if (index) {
      this.todos[index] = value;
      this.storage.setItem('TODOS', this.todos);
      return {
        success: true,
      };
    } else {
      return {
        success: false,
      };
    }
  }

  deleteNote(id: number) {
    this.todos = this.todos.filter((t) => t.id !== id);
    this.storage.setItem('TODOS', this.todos);
  }

  onSelectItem(item: ITodo) {
    this.selectedItem = item;
    this.toggleForm();
  }

  toggleTodoBookmark(id: number) {
    let index = this.todos.findIndex((c) => c?.id === id);
    if (index) {
      this.todos[index].is_bookmark = !this.todos[index].is_bookmark;
      this.storage.setItem('TODOS', this.todos);
      return {
        success: true,
      };
    } else {
      return {
        success: false,
      };
    }
  }

  onRemoveSelect() {
    this.selectedItem = null;
  }
}
