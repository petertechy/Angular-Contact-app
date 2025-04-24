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
  slashedId: number | null = null;

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    const allContacts = this.contactService.getContacts();
    this.favoriteContacts = allContacts.filter((c) => c.isFavorite);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  toggleFavorite(id: number): void {
    this.slashedId = id;

    setTimeout(() => {
      this.contactService.toggleFavorite(id);
      this.loadFavorites();
      this.slashedId = null;
    }, 500);
  }

  addRippleEffect(event: MouseEvent): void {
    const button = event.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
  
    const ripple = document.createElement('span');
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
  
    button.appendChild(ripple);
  
    // Remove the ripple element after the animation is complete
    setTimeout(() => ripple.remove(), 600);
  }
  

}
