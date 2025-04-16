import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private localStorageKey = 'contacts';

  getContacts(): Contact[] {
    const data = localStorage.getItem(this.localStorageKey);
    return data ? JSON.parse(data) : [];
  }

  saveContacts(contacts: Contact[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(contacts));
  }

  addContact(contact: Contact): void {
    const contacts = this.getContacts();
    contacts.push(contact);
    this.saveContacts(contacts);
  }

  deleteContact(id: number): void {
    const contacts = this.getContacts().filter(c => c.id !== id);
    this.saveContacts(contacts);
  }

  getContactById(id: number): Contact | undefined {
    return this.getContacts().find(c => c.id === id);
  }

  updateContact(updated: Contact): void {
    const contacts = this.getContacts().map(c =>
      c.id === updated.id ? updated : c
    );
    this.saveContacts(contacts);
  }
}
