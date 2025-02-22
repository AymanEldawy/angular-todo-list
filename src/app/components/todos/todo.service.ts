import { Injectable } from '@angular/core';
import { ITodo } from '../../interfaces/todo.interface';
import { StorageService } from '../../service/storage.service';
import { TODO_DATA } from '../../utils/TODO-DATA';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private todos: ITodo[] = [];
  
  constructor(private storage: StorageService) {
    this.initializeData();
  }

  private initializeData() {
    const storedTodos = this.storage.getItem('TODOS');
    this.todos = storedTodos || TODO_DATA;

    if (!storedTodos) {
      this.storage.setItem('TODOS', TODO_DATA);
    }
  }

  get data() {
    return this.todos;
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
}
