import { Component, OnInit } from '@angular/core';
import { Weeks } from 'src/app/shared/components/calendar-tools/calendar.api';
import { addDays, getDate, startOfWeek } from 'date-fns';

const daysOfWeek = 7;
const hoursOfDay = 24;

@Component({
  selector: 'app-weekly-calendar',
  templateUrl: './weekly-calendar.component.html',
  styleUrls: ['./weekly-calendar.component.scss']
})

export class WeeklyCalendarComponent implements OnInit {

  weeks = Weeks;

  currentWeek: Date;
  days: number[];
  hours: number[];

  ngOnInit() {
    this.currentWeek = startOfWeek(Date.now());
    this.days = this.generateDays(this.currentWeek);
    this.hours = this.generateHours();
  }

  generateDays(startDate: Date): number[] {
    const days = [getDate(startDate)];

    let i = 0;
    while (i < daysOfWeek - 1) {
      days.push(getDate(addDays(startDate, ++i)));
    }

    return days;
  }

  generateHours = (): number[] => Array(hoursOfDay).fill(null).map((n, index) => ++index);
}
