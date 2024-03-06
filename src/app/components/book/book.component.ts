import { Component, OnInit, inject } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-book',
  standalone: true, 
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './book.component.html'
})

export class BookComponent implements OnInit {
  private bookingService = inject(BookingService);
  private datePipe = inject(DatePipe);
  
  times:any = [];
  today:any;
  firstTime:String = "";

  bookingForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    date: new FormControl(this.datePipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required),
    time: new FormControl(this.firstTime, Validators.required),
    seats: new FormControl(1, Validators.required)
  });
  
  ngOnInit(): void {
    this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.loadTimes();
  }

  loadTimes(){
    this.bookingService.getTimes(this.bookingForm.controls['date'].value).subscribe((data) => {
      this.times = data;
      this.bookingForm.controls['time'].setValue(this.times.length == 0 ? "" : this.times[0]);
    })
  }

  OnFormSubmitted(){
    this.bookingService.postBooking(this.bookingForm.value).subscribe((data)=>{
      if(data) {
        alert("¡Creado!")
      }
    });
  }
}
