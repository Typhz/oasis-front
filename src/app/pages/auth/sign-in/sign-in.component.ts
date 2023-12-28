import { Component } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ChipsModule } from 'primeng/chips';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CheckboxModule,
    ButtonModule,
    RippleModule,
    ChipsModule,
    NgOptimizedImage,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  loading = false;
  currentDate = new Date().getFullYear();

  load() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }
}
