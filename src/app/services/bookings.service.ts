import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/shared/services/http.service';
import { Booking } from '../interfaces/booking.interface';
import { CreateBooking } from '../interfaces/create-booking.interface';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  constructor(private httpService: HttpService) {}

  createBooking(booking: CreateBooking) {
    return this.httpService.post<CreateBooking>('/bookings', booking);
  }
}
