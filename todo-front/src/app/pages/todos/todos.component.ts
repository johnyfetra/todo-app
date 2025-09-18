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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoaderService } from '../../core/loader.service';
import { NotifyService } from '../../core/notify.service';
import { TodoProgressComponent } from '../../features/todos/ui/todo-progress/todo-progress.component';
import { TodoFilterComponent, TodoFilter } from '../../features/todos/ui/todo-filter/todo-filter.component';
import { TodoListComponent } from '../../features/todos/ui/todo-list/todo-list.component';
import { SimpleConfirmDialogComponent } from '../../features/todos/ui/simple-confirm-dialog/simple-confirm-dialog.component';

@Component({
  standalone: true,
  selector: 'app-todos',
  imports: [
    CommonModule, ReactiveFormsModule,
    MatCheckboxModule, MatIconModule,
    MatButtonModule, MatCardModule,
    MatProgressBarModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatDialogModule,
    TodoProgressComponent, TodoFilterComponent, TodoListComponent
  ],
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  private fb = inject(FormBuilder);

  todos: Todo[] = [];
  filter: TodoFilter = 'all';
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
      next: (data: Todo[]) => this.todos = data,
      error: () => this.notify.error('Chargement des tâches échoué'),
      complete: () => this.loader.hide()
    });
  }

  add() {
    if (this.form.invalid) return;
    const title = this.form.get('title')!.value as string;
    this.loader.show();
    this.api.create({ title }).subscribe({
      next: () => { this.notify.success('Tâche ajoutée'); this.form.reset();  this.form.get('title')?.markAsPristine();
        this.form.get('title')?.markAsUntouched();this.load(); },
      error: () => this.notify.error("Échec de l'ajout"),
      complete: () => this.loader.hide()
    });
  }

  toggle(t: Todo) {
    this.api.update(t.id, { done: !t.done }).subscribe({
      next: () => this.load(),
      error: () => this.notify.error('Échec de mise à jour')
    });
  }

  confirmDelete(t: Todo) {
    const ref = this.dialog.open(SimpleConfirmDialogComponent, { data: { title: 'Supprimer', message: 'Confirmer la suppression ?' } });
    ref.afterClosed().subscribe((ok: boolean | undefined) => { if (ok) this.remove(t); });
  }

  remove(t: Todo) {
    this.loader.show();
    this.api.remove(t.id).subscribe({
      next: () => { this.notify.success('Tâche supprimée'); this.load(); },
      error: () => this.notify.error('Échec de suppression'),
      complete: () => this.loader.hide()
    });
  }
}


