import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite-contacts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-contacts.component.html',
  styleUrls: ['./favorite-contacts.component.css'],
})
export class FavoriteContactsComponent implements OnInit {
  favoriteContacts: Contact[] = [];

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    const allContacts = this.contactService.getContacts();
    this.favoriteContacts = allContacts.filter(c => c.isFavorite);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  toggleFavorite(id: number): void {
    this.contactService.toggleFavorite(id);
    this.loadFavorites(); // refresh filtered list
  }
}
