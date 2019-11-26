import { Component, OnInit } from '@angular/core';
import { Weeks, DaysOfWeek, HoursOfDay } from 'src/app/shared/components/calendar-tools/calendar.api';
import { CalendarToolsComponent } from 'src/app/shared/components/calendar-tools/calendar-tools.component';
import { addDays, getDate, startOfWeek } from 'date-fns';
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

  currentDate: Date;
  days: number[];
  hours: number[];

  constructor(private store: Store<AppState>) {
    super();
  }

  ngOnInit() {
    this.hours = this.generateNumberArray(HoursOfDay);
    this.store.pipe(select(getCalendar)).subscribe(this.updateWeek);
  }

  updateWeek = ({ date }) => {
    this.currentDate = startOfWeek(date);
    this.days = this.generateDays(this.currentDate);
  }

  generateDays = (startDate: Date): number[] => Array(DaysOfWeek).fill(0).map((n, index) => getDate(addDays(startDate, index)));
}
