import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

export type TodoFilter = 'all' | 'active' | 'done';

@Component({
  standalone: true,
  selector: 'app-todo-filter',
  imports: [CommonModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFilterComponent {
  @Input() value: TodoFilter = 'all';
  @Output() valueChange = new EventEmitter<TodoFilter>();
}


