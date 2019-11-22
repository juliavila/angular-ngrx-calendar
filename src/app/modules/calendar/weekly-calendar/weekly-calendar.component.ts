import { Component, OnInit } from '@angular/core';
import { Weeks, Months, IWeek, DaysOfWeek, HoursOfDay } from 'src/app/shared/components/calendar-tools/calendar.api';
import { CalendarToolsComponent } from 'src/app/shared/components/calendar-tools/calendar-tools.component';
import { addDays, addWeeks, addYears, getDate, getMonth, getYear, startOfWeek } from 'date-fns';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/store';
import { getCalendar } from 'src/app/core/store/calendar/calendar.selector';

@Component({
  selector: 'app-weekly-calendar',
  templateUrl: './weekly-calendar.component.html',
  styleUrls: ['./weekly-calendar.component.scss']
})

export class WeeklyCalendarComponent extends CalendarToolsComponent implements OnInit {

  weeks = Weeks;
  months = Months;

  currentDate: Date;
  week: IWeek;
  hours: number[];

  constructor(private store: Store<AppState>) {
    super();
  }

  ngOnInit() {
    this.updateWeek(new Date(Date.now()));
    this.hours = this.generateHours();

    this.store.pipe(select(getCalendar)).subscribe(c => this.updateWeek(c.date));
  }

  updateWeek(date: Date) {
    this.currentDate = startOfWeek(date);

    this.week = {
      month: getMonth(this.currentDate),
      year: getYear(this.currentDate),
      days: this.generateDays(this.currentDate)
    };
  }

  generateDays(startDate: Date): number[] {
    const days = [getDate(startDate)];

    let i = 0;
    while (i < DaysOfWeek - 1) {
      days.push(getDate(addDays(startDate, ++i)));
    }

    return days;
  }

  generateHours = (): number[] => this.generateNumberArray(HoursOfDay);

  nextWeek = () => this.updateWeek(addWeeks(this.currentDate, 1));

  previousWeek = () => this.updateWeek(addWeeks(this.currentDate, -1));

  nextYear = () => this.updateWeek(addYears(this.currentDate, 1));

  previousYear = () => this.updateWeek(addYears(this.currentDate, -1));
}
