import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastService } from './services/toast.service'; // Import ToastService

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'contact-app';

  constructor(public toastService: ToastService) {}

  get toastMessage(): string {
    return this.toastService.toastMessage;
  }
}
