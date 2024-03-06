import { Component, OnInit, inject } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './reservations.component.html'
})
export class ReservationsComponent implements OnInit{
  private bookingService = inject(BookingService);
  private datePipe = inject(DatePipe);

  reservations:any = [];
  today:any;
  firstTime:String = "";

  searchForm: FormGroup = new FormGroup({
    date: new FormControl(this.datePipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required)
  });

  ngOnInit(): void {
    this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.OnFormSubmitted();
  }

  OnFormSubmitted(){
    this.bookingService.getReservations(this.searchForm.controls['date'].value).subscribe((data)=>{
      this.reservations = data;
    });
  }
}
