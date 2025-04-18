import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ToastService } from './services/toast.service'; // Import ToastService

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Angular Contact App';

  constructor(public toastService: ToastService) {}

  get toastMessage(): string {
    return this.toastService.toastMessage;
  }
}
