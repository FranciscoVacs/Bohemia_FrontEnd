import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';
import { LoginData, RegisterData } from '../models/auth';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.css'
})
export class AuthModalComponent {
  private fb = inject(FormBuilder);
  public modalService = inject(ModalService);
  private authService = inject(AuthService);

  loginForm: FormGroup;
  registerForm: FormGroup;
  errorMessage = '';
  isLoading = false;
  showPassword = false;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(2)]],
      userSurname: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      ]],
      birthDate: ['', [Validators.required]]
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const credentials: LoginData = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: () => {
        this.isLoading = false;
        this.closeModal();
      },
      error: (error) => {
        this.isLoading = false;
        if (error.status === 401 || error.status === 400) {
          this.errorMessage = 'Verifica tu email y contraseña.';
        } else {
          this.errorMessage = 'Ocurrió un error inesperado al iniciar sesión.';
        }
      }
    });
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const formValue = this.registerForm.value;

    // Transform date to 'YYYY-MM-DD HH:MM:SS'
    // formValue.birthDate comes as 'YYYY-MM-DD' from the input date
    const formattedDate = `${formValue.birthDate} 00:00:00`;

    const data: RegisterData = {
      ...formValue,
      birthDate: formattedDate
    };

    this.authService.register(data).subscribe({
      next: () => {
        this.isLoading = false;
        this.closeModal();
      },
      error: (error) => {
        this.isLoading = false;
        if (error.status === 409) {
          // Conflict: User already exists
          this.registerForm.get('email')?.setErrors({ emailTaken: true });
          this.errorMessage = 'El correo electrónico ya está registrado.';
        } else {
          this.errorMessage = error.error?.message || 'Error al registrarse. Intenta nuevamente.';
        }
      }
    });
  }

  closeModal(): void {
    this.modalService.close();
    this.errorMessage = '';
    this.showPassword = false;
    this.loginForm.reset();
    this.registerForm.reset();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
