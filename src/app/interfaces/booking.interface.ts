export interface BookerAddress {
  addressLine1: string;

  postalCode: string;

  countryCode: string;

  city: string;
}

export interface Booker {
  firstName: string;

  lastName: string;

  address: BookerAddress;

  email: string;

  phone: string;
}

export interface Booking {
  _id: string;
  booker: Booker;
  adults: number;
  arrival: string;
  departure: string;
}
