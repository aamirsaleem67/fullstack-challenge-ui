import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  bookingForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    country: ['', Validators.required],
    postalCode: ['', Validators.required],
    city: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    phoneNumber: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  get firstName() {
    return this.bookingForm.get('firstName');
  }
  get lastName() {
    return this.bookingForm.get('lastName');
  }
  get address() {
    return this.bookingForm.get('address');
  }
  get country() {
    return this.bookingForm.get('country');
  }
  get postalCode() {
    return this.bookingForm.get('postalCode');
  }
  get city() {
    return this.bookingForm.get('city');
  }

  get email() {
    return this.bookingForm.get('email');
  }
}
