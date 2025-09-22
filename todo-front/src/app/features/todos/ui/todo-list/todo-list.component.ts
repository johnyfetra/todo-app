import { ChangeDetectionStrategy, Component, EventEmitter, input, Input, output, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { TodoVM } from '../../../../models/todo.model';

@Component({
  standalone: true,
  selector: 'app-todo-list',
  imports: [CommonModule, TodoCardComponent],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {
  items = input.required<TodoVM[]>();
  toggle = output<TodoVM>();
  remove = output<TodoVM>();
  moreInfo = output<TodoVM>();
  edit = output<TodoVM>();

  trackById = (_: number, t: TodoVM) => t.id;
}


