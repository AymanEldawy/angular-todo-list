import { Component, computed, Input } from '@angular/core';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { ITodo } from '../../interfaces/todo.interface';
import { CommonModule } from '@angular/common';
import { AddTodoComponent } from '../add-todo/add-todo.component';

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

  todos: ITodo[] = [
    {
      id: 1,
      title: 'First Object',
      description: "This is the first object's description.",
      date: '2025-01-03T12:00:00Z',
      is_bookmark: false,
    },
    {
      id: 2,
      title: 'Second Object',
      description: "This is the second object's description.",
      date: '2025-01-04T09:30:00Z',
      is_bookmark: false,
    },
    {
      id: 3,
      title: 'Third Object',
      description: "This is the third object's description.",
      date: '2025-01-05T15:45:00Z',
      is_bookmark: false,
    },
    {
      id: 4,
      title: 'Fourth Object',
      description: "This is the fourth object's description.",
      date: '2025-01-06T18:00:00Z',
      is_bookmark: false,
    },
    {
      id: 5,
      title: 'Fifth Object',
      description: "This is the fifth object's description.",
      date: '2025-01-07T10:00:00Z',
      is_bookmark: false,
    },
  ];

  get bookmarksCount() {
    return this.todos.filter((c) => c.is_bookmark).length;
  }

  get filteredTodos() {
    return this.todos.filter((c) => {
      if (this.isFiltered) return c.is_bookmark;
      else return c;
    });
  }

  ngOnInit() {}

  toggleForm() {
    this.openForm = !this.openForm;
    console.log('called');
    console.log(this.openForm, 'openForm');
  }

  addNote(value: ITodo): { success: boolean } {
    console.log('called insert');
    this.todos.unshift(value);
    return {
      success: true,
    };
  }

  updateNote(value: ITodo): { success: boolean } {
    console.log('called update');
    let index = this.todos.findIndex((c) => c?.id == value?.id);
    if (index) {
      this.todos[index] = value;
      return {
        success: true,
      };
    } else {
      return {
        success: false,
      };
    }
  }

  onSelectItem(item: ITodo) {
    this.selectedItem = item;
    this.toggleForm();
  }

  toggleTodoBookmark(id: number) {
    let index = this.todos.findIndex((c) => c?.id === id);
    if (index) {
      this.todos[index].is_bookmark = !this.todos[index].is_bookmark;
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
