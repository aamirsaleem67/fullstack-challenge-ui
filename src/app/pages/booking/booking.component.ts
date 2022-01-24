import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { countriesWithAlphaCode } from 'src/shared/constants/countries-with-alpha-code';
import { CountriesWithAlphaCode } from 'src/shared/interfaces/countries-with-alpha-code.interface';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  countries: CountriesWithAlphaCode[] = countriesWithAlphaCode;

  bookingForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    countryCode: ['', Validators.required],
    postalCode: ['', Validators.required],
    city: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', Validators.required],
    arrival: [null, Validators.required],
    departure: [null, Validators.required],
  });

  constructor(private fb: FormBuilder) {
    console.log(this.countries[0]);
  }

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

  changeCountry(e: any) {
    console.log('target', e.target.value);
    this.countryCode?.setValue(e.target.value, {
      onlySelf: true,
    });
    console.log(this.countryCode?.value);
  }
}
