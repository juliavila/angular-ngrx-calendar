import { Component, OnInit } from '@angular/core';
import { CalendarToolsComponent } from '../calendar-tools/calendar-tools.component';
import { IMonth, Months, Weeks } from '../calendar-tools/calendar.api';
import { addMonths, addYears, setMonth, startOfMonth, setDay } from 'date-fns';
import { Observable } from 'rxjs';
import { Calendar } from 'src/app/core/store/calendar/calendar.reducer';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/store';
import { getCalendar } from 'src/app/core/store/calendar/calendar.selector';
import { changeDate } from 'src/app/core/store/calendar/calendar.actions';

enum ViewMode {
  days,
  months
}

@Component({
  selector: 'app-mini-calendar',
  templateUrl: './mini-calendar.component.html',
  styleUrls: ['./mini-calendar.component.scss']
})

export class MiniCalendarComponent extends CalendarToolsComponent implements OnInit {

  weeks = Weeks;
  months = Months;

  currentDate: Date;

  lastMonth: IMonth;
  currentMonth: IMonth;
  nextMonth: IMonth;

  lastMonthDays: number[];
  nextMonthDays: number[];

  viewMode = ViewMode;
  viewModeActive: ViewMode;

  calendar: Observable<Calendar>;

  constructor(private store: Store<AppState>) {
    super();
  }

  ngOnInit() {
    this.viewModeActive = ViewMode.days;
    this.updateMonths(startOfMonth(new Date(Date.now())));

    this.store.pipe(select(getCalendar)).subscribe(c => this.updateMonths(startOfMonth(c.date)));
  }

  changeCurrentDate(month: IMonth, day: number) {
    const date: Date = new Date(month.year, month.month, day);
    this.updateMonths(date);
    this.store.dispatch(changeDate({ date }));
  }

  goToNext(): void {
    const actions = {
      [ViewMode.days]: this.goToNextMonth,
      [ViewMode.months]: this.goToNextYear
    };

    actions[this.viewModeActive]();
  }

  goToPrevious(): void {
    const actions = {
      [ViewMode.days]: this.goToPreviousMonth,
      [ViewMode.months]: this.goToPreviousYear
    };

    actions[this.viewModeActive]();
  }

  goToNextMonth = (): void => this.updateMonths(addMonths(this.currentDate, 1));

  goToPreviousMonth = (): void => this.updateMonths(addMonths(this.currentDate, -1));

  goToNextYear = (): void => this.updateMonths(addYears(this.currentDate, 1));

  goToPreviousYear = (): void => this.updateMonths(addYears(this.currentDate, -1));

  goToMonth(month: number): void {
    this.updateMonths(setMonth(this.currentDate, month));
    this.viewModeActive = ViewMode.days;
  }

  updateMonths(currentDate: Date): void {
    this.currentDate = currentDate;

    this.currentMonth = this.updateCurrentMoth(currentDate);

    this.lastMonth = this.updateLastMonth(currentDate);
    this.nextMonth = this.updateNextMonth(currentDate);

    this.lastMonthDays = this.sliceLastMonth(this.lastMonth, this.currentMonth);
    this.nextMonthDays = this.sliceNextMonth(this.nextMonth, this.currentMonth);
  }
}
