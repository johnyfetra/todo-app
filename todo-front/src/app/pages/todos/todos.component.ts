import { Component, OnInit, inject, Inject } from '@angular/core';
import { ApiTodoService, Todo } from '../../api/todo.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoaderService } from '../../core/loader.service';
import { NotifyService } from '../../core/notify.service';

@Component({
  standalone: true,
  selector: 'app-todos',
  imports: [
    CommonModule, ReactiveFormsModule,
    MatCheckboxModule, MatIconModule,
    MatButtonModule, MatCardModule,
    MatProgressBarModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatDialogModule
  ],
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  private fb = inject(FormBuilder);

  todos: Todo[] = [];
  filter: 'all' | 'active' | 'done' = 'all';
  form = this.fb.group({ title: ['', [Validators.required, Validators.minLength(2)]] });

  constructor(private api: ApiTodoService, private loader: LoaderService, private notify: NotifyService, private dialog: MatDialog) {}

  ngOnInit() { this.load(); }

  get filtered() {
    if (this.filter === 'done') return this.todos.filter(t => t.done);
    if (this.filter === 'active') return this.todos.filter(t => !t.done);
    return this.todos;
  }

  get doneCount() { return this.todos.filter(t => t.done).length; }
  get progress() {
    return this.todos.length ? (this.doneCount / this.todos.length) * 100 : 0;
  }

  load() {
    this.loader.show();
    this.api.list().subscribe({
      next: data => this.todos = data,
      error: () => this.notify.error('Chargement des tâches échoué'),
      complete: () => this.loader.hide()
    });
  }

  add() {
    if (this.form.invalid) return;
    const title = this.form.get('title')!.value as string;
    this.loader.show();
    this.api.create({ title }).subscribe({
      next: _ => { this.notify.success('Tâche ajoutée'); this.form.reset();  this.form.get('title')?.markAsPristine();
        this.form.get('title')?.markAsUntouched();this.load(); },
      error: () => this.notify.error("Échec de l'ajout"),
      complete: () => this.loader.hide()
    });
  }

  toggle(t: Todo) {
    this.api.update(t.id, { done: !t.done }).subscribe({
      next: _ => this.load(),
      error: () => this.notify.error('Échec de mise à jour')
    });
  }

  confirmDelete(t: Todo) {
    const ref = this.dialog.open(SimpleConfirmDialog, { data: { title: 'Supprimer', message: 'Confirmer la suppression ?' } });
    ref.afterClosed().subscribe(ok => { if (ok) this.remove(t); });
  }

  remove(t: Todo) {
    this.loader.show();
    this.api.remove(t.id).subscribe({
      next: _ => { this.notify.success('Tâche supprimée'); this.load(); },
      error: () => this.notify.error('Échec de suppression'),
      complete: () => this.loader.hide()
    });
  }
}

@Component({
  standalone: true,
  selector: 'simple-confirm-dialog',
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <div style="padding:16px; max-width: 360px;">
      <h3 style="margin:0 0 8px 0;">{{ data.title }}</h3>
      <p style="margin:0 0 16px 0;">{{ data.message }}</p>
      <div style="display:flex; justify-content:flex-end; gap:8px;">
        <button mat-button mat-dialog-close="false">Annuler</button>
        <button mat-raised-button color="warn" mat-dialog-close="true">Supprimer</button>
      </div>
    </div>
  `
})
export class SimpleConfirmDialog { constructor(@Inject(MAT_DIALOG_DATA) public data: any) {} }
