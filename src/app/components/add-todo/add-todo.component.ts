import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ITodo } from '../../interfaces/todo.interface';

@Component({
  selector: 'app-add-todo',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss',
})
export class AddTodoComponent {
  form: any;
  @Output() toggleForm = new EventEmitter();
  @Output() addNewNote = new EventEmitter();
  @Output() updateNote = new EventEmitter();
  @Output() removeSelect = new EventEmitter();
  @Input() selectedItem!: null | ITodo;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      // title: fb.control('', { validators: true }),
      title: ['', Validators.required],
      description: [''],
      date: [new Date().toISOString().substring(0, 10)],
    });
  }

  get FB() {
    return this.form.controls;
  }

  ngOnInit() {
    this.form.patchValue(this.selectedItem);
    console.log('called oninit', this.form);
  }

  ngOnDestroy() {
    if (this.selectedItem) {
      this.removeSelect.emit();
    }
  }

  handleSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.selectedItem?.id) {
      console.log(this.form.value, 'value', this.selectedItem);
      this.updateNote.emit({
        ...this.form.value,
        id: this.selectedItem?.id,
      });
    } else {
      this.addNewNote.emit(this.form.value);
      console.log('called here insert');
      this.form.reset();
      this.onClose();
    }
  }

  onClose() {
    this.toggleForm.emit();
  }
}
