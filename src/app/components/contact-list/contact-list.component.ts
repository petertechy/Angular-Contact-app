import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  searchTerm: string = '';

  constructor(
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contacts = this.contactService.getContacts();
  }

  deleteContact(id: number): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.deleteContact(id);
      this.loadContacts();
    }
  }

  goToEdit(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  get filteredContacts(): Contact[] {
    const term = this.searchTerm.toLowerCase();
    return this.contacts.filter(contact =>
      contact.name.toLowerCase().includes(term) ||
      contact.email.toLowerCase().includes(term) ||
      contact.phone.toLowerCase().includes(term)
    );
  }
}
