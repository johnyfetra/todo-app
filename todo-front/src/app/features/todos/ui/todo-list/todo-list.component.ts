import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoCardComponent, TodoVM } from '../todo-card/todo-card.component';

@Component({
  standalone: true,
  selector: 'app-todo-list',
  imports: [CommonModule, TodoCardComponent],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {
  @Input() items: TodoVM[] = [];
  @Output() toggle = new EventEmitter<TodoVM>();
  @Output() remove = new EventEmitter<TodoVM>();
}


