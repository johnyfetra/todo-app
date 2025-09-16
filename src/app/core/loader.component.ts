import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from './loader.service';

@Component({
  standalone: true,
  selector: 'app-loader',
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div *ngIf="loader.active$ | async" class="overlay">
      <mat-progress-spinner mode="indeterminate" diameter="48" color="primary"></mat-progress-spinner>
    </div>
  `,
  styles: [`
    .overlay {
      position: fixed; inset: 0; display: grid; place-items: center;
      background: rgba(0,0,0,0.15); z-index: 1000;
    }
  `]
})
export class LoaderComponent { constructor(public loader: LoaderService) {} }


