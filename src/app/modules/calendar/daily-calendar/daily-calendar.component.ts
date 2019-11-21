import { Component, OnInit } from '@angular/core';
import { Weeks, Months, IDay, HoursOfDay } from 'src/app/shared/components/calendar-tools/calendar.api';
import { CalendarToolsComponent } from 'src/app/shared/components/calendar-tools/calendar-tools.component';
import { addDays, addYears, getDay, getDate, getMonth, getYear, startOfWeek } from 'date-fns';

@Component({
  selector: 'app-daily-calendar',
  templateUrl: './daily-calendar.component.html',
  styleUrls: ['./daily-calendar.component.scss']
})

export class DailyCalendarComponent extends CalendarToolsComponent implements OnInit {

  weeks = Weeks;
  months = Months;

  currentDate: Date;
  day: IDay;
  hours: number[];

  ngOnInit() {
    this.updateDay(new Date(Date.now()));
    this.hours = this.generateHours();
  }

  updateDay(date: Date) {
    this.currentDate = date;

    this.day = {
      year: getYear(this.currentDate),
      month: getMonth(this.currentDate),
      week: getDay(this.currentDate),
      day: getDate(this.currentDate)
    };
  }

  generateHours = (): number[] => this.generateNumberArray(HoursOfDay);

  nextDay = () => this.updateDay(addDays(this.currentDate, 1));

  previousDay = () => this.updateDay(addDays(this.currentDate, -1));

  nextYear = () => this.updateDay(addYears(this.currentDate, 1));

  previousYear = () => this.updateDay(addYears(this.currentDate, -1));
}
