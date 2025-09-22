import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Ajout de FormBuilder et FormGroup
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TodoVM } from '../../../../models/todo.model';
import { TodoDialog, TodoDialogEdit } from '../../../../models/dialog.model';

@Component({
  standalone: true,
  selector: 'app-edit-task-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent {
  form: FormGroup;
  initialFormValue: any;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TodoDialog
  ) {
    
  // Créer le formGroup avec les champs nécessaires
  if (this.isTodoDialogEdit(data)) {
    // Si c'est un TodoDialogEdit, on utilise les données de la tâche (todo)
    const todoData = data as TodoDialogEdit;
    this.form = this.fb.group({
      title: [todoData.todo.title, [Validators.required, Validators.minLength(2)]],
      description: [todoData.todo.description],
      done: [todoData.todo.done]
    });
     // Stocker les valeurs initiales
     this.initialFormValue = this.form.getRawValue();
  } else {
    // Si c'est un TodoDialogCreate, on initialise les champs vides
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      done: [false]
    });
    // Stocker les valeurs initiales
    this.initialFormValue = this.form.getRawValue();
  }
  }

  private isTodoDialogEdit(data: TodoDialog): data is TodoDialogEdit {
    return (data as TodoDialogEdit).todo !== undefined;
  }

  onValid() {
    if (this.form.valid) {
      const editTask: TodoVM = this.form.value;
      this.dialogRef.close(editTask);
    }
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  // Méthode pour vérifier si le formulaire a changé
  hasChanged(): boolean {
    return JSON.stringify(this.form.getRawValue()) !== JSON.stringify(this.initialFormValue);
  }
}
