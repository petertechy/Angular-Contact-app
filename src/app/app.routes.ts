import { Routes } from '@angular/router';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactAddComponent } from './components/contact-add/contact-add.component';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';

export const routes: Routes = [
  { path: '', component: ContactListComponent },
  { path: 'add', component: ContactAddComponent },
  { path: 'edit/:id', component: ContactEditComponent },
];
