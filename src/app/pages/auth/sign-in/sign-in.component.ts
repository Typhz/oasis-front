import { Component, OnInit } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ChipsModule } from 'primeng/chips';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CheckboxModule,
    ButtonModule,
    RippleModule,
    ChipsModule,
    NgOptimizedImage,
    HttpClientModule,
    MessagesModule,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit {
  loading = false;
  loginForm!: FormGroup;
  currentDate = new Date().getFullYear();
  messages: Message[] = [];

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      remember: new FormControl(false),
    });
  }

  signIn() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService
        .signIn(this.loginForm.value)
        .subscribe({
          error: (error) => {
            this.loading = false;
            this.messages = [
              {
                severity: 'error',
                summary: 'Falha na autenticação',
                detail: 'Usuário ou senha inválidos',
              },
            ];
            console.log(error);
          },
        })
        .add(() => {
          this.loading = false;
        });
    }
  }
}
