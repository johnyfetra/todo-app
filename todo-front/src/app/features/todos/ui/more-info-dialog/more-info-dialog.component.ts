import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TodoVM } from '../../../../models/todo.model';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  standalone: true,
  selector: 'app-more-info-dialog',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule
  ],
  templateUrl: './more-info-dialog.component.html',
  styleUrl: './more-info-dialog.component.scss'
})
export class MoreInfoDialogComponent {
  task: TodoVM;

  constructor(
    public dialogRef: MatDialogRef<MoreInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TodoVM
  ) {
    this.task = data;
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
