import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiAuthService } from '../../api/auth.service';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../../core/auth.interceptor';
import { LoaderService } from '../../core/loader.service';
import { NotifyService } from '../../core/notify.service';
import { finalize } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrls: [`./login.component.scss` ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class LoginComponent {
  form;
  constructor(private fb: FormBuilder, private api: ApiAuthService, private auth: AuthService, private router: Router, private loader: LoaderService, private notify: NotifyService) {
    this.form = this.fb.group({ email: ['', [Validators.required, Validators.email]], password: ['', [Validators.required]] });
  }
  onSubmit() {
    if (this.form.invalid) return;
    this.loader.show();
    this.api.login(this.form.value as any)
      .pipe(finalize(() => this.loader.hide()))
      .subscribe({
        next: (res) => {
          this.auth.setToken(res.access_token);
          this.notify.success('Connexion réussie');
          this.router.navigateByUrl('/');
        },
        error: () => this.notify.error('Échec de connexion')
      });
  }
}
