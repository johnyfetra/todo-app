import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, ValidationErrors, ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ApiAuthService } from '../../api/auth.service';
import { LoaderService } from '../../core/loader.service';
import { NotifyService } from '../../core/notify.service';

function passwordsMatchValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  };
}

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiAuthService, private router: Router, private loader: LoaderService, private notify: NotifyService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: passwordsMatchValidator() });
  }

  onSubmit() {
    if (this.form.invalid) return;
    const email = this.form.get('email')!.value as string;
    const password = this.form.get('password')!.value as string;
    this.loader.show();
    this.api.register({ email, password }).subscribe({
      next: () => {
        this.notify.success('Inscription réussie');
        this.router.navigateByUrl('/login');
      },
      error: () => this.notify.error("Échec de l'inscription"),
      complete: () => this.loader.hide()
    });
  }
}


