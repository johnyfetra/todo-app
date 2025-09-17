import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotifyService {
  private base: MatSnackBarConfig = { duration: 2500, horizontalPosition: 'right', verticalPosition: 'bottom' };

  constructor(private snack: MatSnackBar) {}

  success(message: string) {
    this.snack.open('✅ ' + message, 'OK', { ...this.base, panelClass: ['snack-success'] });
  }
  error(message: string) {
    this.snack.open('⚠️ ' + message, 'Fermer', { ...this.base, panelClass: ['snack-error'] });
  }
  info(message: string) {
    this.snack.open('ℹ️ ' + message, 'OK', { ...this.base, panelClass: ['snack-info'] });
  }
}


