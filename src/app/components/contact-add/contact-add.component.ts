import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css'],
})
export class ContactAddComponent {
  contact: Partial<Contact> = {
    name: '',
    email: '',
    phone: '',
  };

  constructor(private contactService: ContactService, private router: Router) {}

  addContact(): void {
    const { name, email, phone } = this.contact;

    if (!name?.trim() || !email?.trim() || !phone?.trim()) {
      alert('All fields are required!');
      return;
    }

    const newContact: Contact = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
    };

    this.contactService.addContact(newContact);
    this.router.navigate(['/']);
  }
}
