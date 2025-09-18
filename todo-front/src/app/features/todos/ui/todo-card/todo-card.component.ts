import { ChangeDetectionStrategy, Component, computed, effect, EventEmitter, input, Input, output, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TodoVM } from '../../../../models/todo.model';

@Component({
  standalone: true,
  selector: 'app-todo-card',
  imports: [CommonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatButtonModule],
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoCardComponent {
  todo = input.required<TodoVM>();
  toggle = output<void>();
  remove = output<void>();

  title = computed(() => this.todo().title);
  done  = computed(() => this.todo().done);


  onCardClick() {
    this.toggle.emit();
  }

  onDeleteClick(event: MouseEvent) {
    event.stopPropagation();
    this.remove.emit();
  }

  onCheckboxClick(event: MouseEvent) {
    event.stopPropagation();
  }

  onCheckboxChange(_ev: MatCheckboxChange) {
    this.toggle.emit();
  }
}
