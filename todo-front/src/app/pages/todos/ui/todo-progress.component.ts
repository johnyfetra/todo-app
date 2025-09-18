import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  standalone: true,
  selector: 'app-todo-progress',
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './todo-progress.component.html',
  styleUrls: ['./todo-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoProgressComponent {
  @Input() value = 0;
  @Input() total = 0;
  @Input() done = 0;
}


