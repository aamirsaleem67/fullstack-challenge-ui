export interface CreateAddress {
  addressLine1: string;

  postalCode: string;

  countryCode: string;

  city: string;
}

export interface CreateBooker {
  firstName: string;

  lastName: string;

  address: CreateAddress;

  email: string;

  phone: string;
}

export interface CreateBooking {
  booker: CreateBooker;

  arrival: string;

  departure: string;

  adults: number;
}
