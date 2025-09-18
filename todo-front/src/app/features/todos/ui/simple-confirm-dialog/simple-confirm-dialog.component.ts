import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface SimpleConfirmDialogData {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

@Component({
  standalone: true,
  selector: 'app-simple-confirm-dialog',
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.title || 'Confirmer' }}</h2>
    <mat-dialog-content>
      <p>{{ data.message || 'Êtes-vous sûr ?' }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="close(false)">{{ data.cancelText || 'Annuler' }}</button>
      <button mat-raised-button color="warn" (click)="close(true)">{{ data.confirmText || 'Supprimer' }}</button>
    </mat-dialog-actions>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleConfirmDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<SimpleConfirmDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public data: SimpleConfirmDialogData
  ) {}

  close(ok: boolean) { this.dialogRef.close(ok); }
}


