import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-contact-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
})
export class ContactEditComponent implements OnInit {
  contact!: Contact | undefined;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.contact = this.contactService.getContactById(id);

    if (!this.contact) {
      alert('Contact not found!');
      this.router.navigate(['/']);
    }
  }

  updateContact(): void {
    if (
      !this.contact?.name.trim() ||
      !this.contact?.email.trim() ||
      !this.contact?.phone.trim()
    ) {
      alert('All fields are required!');
      return;
    }

    this.contactService.updateContact(this.contact);
    this.toastService.showToast('Contact updated successfully!');
    this.router.navigate(['/']);
  }
}
