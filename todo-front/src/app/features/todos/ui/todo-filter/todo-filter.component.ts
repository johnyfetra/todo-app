import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { TodoFilter } from '../../../../models/todo.model';

@Component({
  standalone: true,
  selector: 'app-todo-filter',
  imports: [CommonModule, MatSelectModule],
  template: `
    <div style="margin: 8px 0 16px 0; max-width: 220px;">
      <mat-form-field appearance="outline" style="width:100%;">
        <mat-label>Filtrer</mat-label>
        <mat-select [value]="value" (valueChange)="onChange($event)">
          <mat-option [value]="'all'">Toutes</mat-option>
          <mat-option [value]="'active'">Actives</mat-option>
          <mat-option [value]="'done'">Terminées</mat-option>
        </mat-select>
      </mat-form-field>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFilterComponent {
  @Input() value: TodoFilter = 'all';
  @Output() valueChange = new EventEmitter<TodoFilter>();

  onChange(v: TodoFilter) { this.valueChange.emit(v); }
}


