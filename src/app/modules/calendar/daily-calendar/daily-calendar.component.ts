import { Component, OnInit } from '@angular/core';
import { Weeks, Months, HoursOfDay } from 'src/app/shared/components/calendar-tools/calendar.api';
import { CalendarToolsComponent } from 'src/app/shared/components/calendar-tools/calendar-tools.component';
import { getDay, getDate } from 'date-fns';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/store';
import { getCalendar } from 'src/app/core/store/calendar/calendar.selector';

@Component({
  selector: 'app-daily-calendar',
  templateUrl: './daily-calendar.component.html',
  styleUrls: ['./daily-calendar.component.scss']
})

export class DailyCalendarComponent extends CalendarToolsComponent implements OnInit {

  weeks = Weeks;
  months = Months;

  currentDate: Date;
  day: number;
  week: number;
  hours: number[];

  constructor(private store: Store<AppState>) {
    super();
  }

  ngOnInit() {
    this.hours = this.generateNumberArray(HoursOfDay);
    this.store.pipe(select(getCalendar)).subscribe(this.updateDay);
  }

  updateDay = ({ date }) => {
    this.currentDate = date;
    this.week = getDay(this.currentDate);
    this.day = getDate(this.currentDate);
  }
}
