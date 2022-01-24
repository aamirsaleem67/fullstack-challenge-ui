import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-datepicker-range',
  templateUrl: './datepicker-range.component.html',
  styles: [
    `
      .custom-day {
        text-align: center;
        padding: 0.185rem 0.25rem;
        display: inline-block;
        height: 2rem;
        width: 2rem;
      }
      .custom-day.focused {
        background-color: #red;
      }
      .custom-day.range,
      .custom-day:hover {
        background-color: rgb(2, 117, 216);
        color: white;
      }
      .custom-day.faded {
        background-color: rgba(2, 117, 216, 0.5);
      }
    `,
  ],
})
export class DatepickerRangeComponent {
  @Input() parentForm!: FormGroup;
  @ViewChild('dp') dp!: NgbDateStruct;
  model!: NgbDateStruct;

  hoveredDate: NgbDate | null = null;

  fromDate!: NgbDate;
  toDate!: NgbDate | null;
  minDate: NgbDate;
  maxDate: NgbDate;
  constructor(calendar: NgbCalendar) {
    this.minDate = calendar.getToday();
    this.maxDate = calendar.getNext(calendar.getToday(), 'y');
    // this.fromDate = calendar.getToday();
  }

  onDateSelection(date: NgbDate, datepicker: any) {
    console.log('BEFORE', this.fromDate, this.toDate);

    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.parentForm.patchValue({
        arrival: date,
      });
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.parentForm.patchValue({
        departure: date,
      });
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.parentForm.patchValue({
        departure: null,
        arrival: date,
      });
    }
    console.log('after', this.fromDate, this.toDate);

    if (this.fromDate && this.toDate) {
      datepicker.close();
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }
}
