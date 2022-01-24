import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStructAdapter } from '@ng-bootstrap/ng-bootstrap/datepicker/adapters/ngb-date-adapter';
import { CreateBooking } from 'src/app/interfaces/create-booking.interface';
import { BookingsService } from 'src/app/services/bookings.service';
import { countriesWithAlphaCode } from 'src/shared/constants/countries-with-alpha-code';
import { CountriesWithAlphaCode } from 'src/shared/interfaces/countries-with-alpha-code.interface';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  countries: CountriesWithAlphaCode[] = countriesWithAlphaCode;
  isLoading = false;
  bookingForm = this.fb.group({
    arrival: [null, Validators.required],
    departure: [null, Validators.required],
    adults: [0, [Validators.min(1), Validators.max(15)]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    countryCode: ['', Validators.required],
    postalCode: ['', Validators.required],
    city: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private bookingsService: BookingsService
  ) {
    console.log(this.countries[0]);
  }

  ngOnInit(): void {}

  get adults() {
    return this.bookingForm.get('adults');
  }

  get firstName() {
    return this.bookingForm.get('firstName');
  }
  get lastName() {
    return this.bookingForm.get('lastName');
  }
  get address() {
    return this.bookingForm.get('address');
  }
  get countryCode() {
    return this.bookingForm.get('countryCode');
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

  get phoneNumber() {
    return this.bookingForm.get('phoneNumber');
  }

  get arrival() {
    return this.bookingForm.get('arrival');
  }

  get departure() {
    return this.bookingForm.get('departure');
  }

  changeCountry(e: any) {
    console.log('target', e.target.value);
    this.countryCode?.setValue(e.target.value, {
      onlySelf: true,
    });
    console.log(this.countryCode?.value);
  }

  createBooking() {
    this.isLoading = true;
    const dto: CreateBooking = {
      booker: {
        firstName: this.firstName?.value,
        lastName: this.lastName?.value,
        email: this.email?.value,
        phone: this.phoneNumber?.value,
        address: {
          addressLine1: this.address?.value,
          postalCode: this.postalCode?.value,
          countryCode: this.countryCode?.value,
          city: this.city?.value,
        },
      },
      adults: this.adults?.value,
      arrival: this.getFormattedDate(this.arrival?.value),
      departure: this.getFormattedDate(this.departure?.value),
    };
    console.log(dto);

    this.bookingsService.createBooking(dto).subscribe((booking) => {
      console.log(booking);
    });
  }

  private getFormattedDate(date: NgbDateStruct): string {
    const dateString = `${date?.year}-${date?.month}-${date?.day}`;
    return new Date(dateString).toISOString().split('T')[0]; // TODO: Not a good approach
  }
}
