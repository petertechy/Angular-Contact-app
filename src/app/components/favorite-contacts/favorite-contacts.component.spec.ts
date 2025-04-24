import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteContactsComponent } from './favorite-contacts.component';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
import { Contact } from '../../models/contact.model';

describe('FavoriteContactsComponent', () => {
  let component: FavoriteContactsComponent;
  let fixture: ComponentFixture<FavoriteContactsComponent>;
  let contactService: jasmine.SpyObj<ContactService>;

  beforeEach(async () => {
    const contactSpy = jasmine.createSpyObj('ContactService', ['getContacts', 'toggleFavorite']);

    await TestBed.configureTestingModule({
      imports: [FavoriteContactsComponent],
      providers: [
        { provide: ContactService, useValue: contactSpy },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteContactsComponent);
    component = fixture.componentInstance;
    contactService = TestBed.inject(ContactService) as jasmine.SpyObj<ContactService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load favorite contacts on init', () => {
    const mockContacts: Contact[] = [
      {
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
        phone: '1234567890',
        isFavorite: true
      },
      {
        id: 2,
        name: 'Bob',
        email: 'bob@example.com',
        phone: '0987654321',
        isFavorite: false
      }
    ];
    

    contactService.getContacts.and.returnValue(mockContacts);
    component.loadFavorites();
    expect(component.favoriteContacts.length).toBe(1);
    expect(component.favoriteContacts[0].name).toBe('Alice');
  });
});
