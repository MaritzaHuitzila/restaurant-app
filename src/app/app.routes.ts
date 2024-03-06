import { Routes } from '@angular/router';
import { BookComponent } from './components/book/book.component';
import { ReservationsComponent } from './components/reservations/reservations.component';

export const routes: Routes = [
    { path: '', component: BookComponent },
    { path: 'book', component: BookComponent },
    { path: 'reservations', component: ReservationsComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'book' }
];
