import { Component, OnInit, inject, Inject } from '@angular/core';
import { ApiTodoService } from '../../api/todo.service';
import { Todo, TodoCreate, TodoFilter } from '../../models/todo.model';
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
import { TodoFilterComponent } from '../../features/todos/ui/todo-filter/todo-filter.component';
import { TodoListComponent } from '../../features/todos/ui/todo-list/todo-list.component';
import { SimpleConfirmDialogComponent } from '../../features/todos/ui/simple-confirm-dialog/simple-confirm-dialog.component';
import { MoreInfoDialogComponent } from '../../features/todos/ui/more-info-dialog/more-info-dialog.component';
import { TaskDialogComponent } from '../../features/todos/ui/task-dialog/task-dialog.component';
import { TodoDialog } from '../../models/dialog.model';

@Component({
  standalone: true,
  selector: 'app-todos',
  imports: [
    CommonModule, ReactiveFormsModule,
    MatCheckboxModule, MatIconModule,
    MatButtonModule, MatCardModule,
    MatProgressBarModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatDialogModule,
    TodoProgressComponent, TodoFilterComponent, TodoListComponent, MoreInfoDialogComponent, TaskDialogComponent
  ],
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  private fb = inject(FormBuilder);

  todos: Todo[] = [];
  filter: TodoFilter = 'all';
  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    description: ''
   });

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
    const creatDialogData: TodoDialog = {
      dialogTitle: "Créer une nouvelle tâche",
      buttonType: "Créer",
    }

    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '520px',
      height: '550px',
      data: creatDialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      const newTask: TodoCreate = {
        title: result.title,
        description: result.description,
        done: result.done
      }
      this.addTask(newTask)
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

  openMoreInfoDialog(t: Todo) {
    const dialogRef = this.dialog.open(MoreInfoDialogComponent, {
      width: '520px',
      height: '600px',
      data: t
    });

    dialogRef.afterClosed();
  }

  onEditTaskDialog(t: Todo) {
    const editDialog: TodoDialog = {
      dialogTitle: "Modifier une tâche",
      buttonType: "Modifier",
      todo: t
    }

    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '520px',
      height: '550px',
      data: editDialog
    });

    dialogRef.afterClosed().subscribe(result => {
      const editTask: Todo = {
        id: t.id,
        title: result.title,
        description: result.description,
        done: result.done
      }
      this.edit(editTask)
    });
  }

  addTask(t: TodoCreate) {
    this.loader.show();
    this.api.create(t).subscribe({
      next: () => { this.notify.success('Nouvelle tâche ajouté'); this.load(); },
      error: () => this.notify.error('Création échoué'),
      complete: () => this.loader.hide()
    });
  }

  edit(t: Todo) {
    this.loader.show();
    this.api.update(t.id, t).subscribe({
      next: () => { this.notify.success('Tâche modifiée'); this.load(); },
      error: () => this.notify.error('Échec de la modification'),
      complete: () => this.loader.hide()
    });
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


