import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface TodoVM { id: number; title: string; done: boolean; }

@Component({
  standalone: true,
  selector: 'app-todo-card',
  imports: [CommonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatButtonModule],
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoCardComponent {
  @Input() todo!: TodoVM;
  @Output() toggle = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();
}


