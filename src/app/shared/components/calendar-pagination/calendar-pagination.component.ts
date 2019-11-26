import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/store';
import { getCalendar } from 'src/app/core/store/calendar/calendar.selector';
import { Calendar } from 'src/app/core/store/calendar/calendar.reducer';
import { changeDate } from 'src/app/core/store/calendar/calendar.actions';
import { setMonth, addYears, addDays } from 'date-fns';
import { addWeeks } from 'date-fns/esm';

@Component({})
export abstract class CalendarPaginationComponent {

  private currentDate: Date;

  constructor(private store: Store<AppState>) {
    const $currentDate = this.store.pipe(select(getCalendar));
    $currentDate.subscribe(calendar => {
      this.currentDate = calendar.date;
      this.update && this.update(calendar);
    });
  }

  private changeCurrentDate = (date: Date) => this.store.dispatch(changeDate({ date }));

  protected goToMonth = (month: number) => this.changeCurrentDate(setMonth(this.currentDate, month));

  protected goToPreviousDate = () => this.changeCurrentDate(addDays(this.currentDate, -1));

  protected goToNextDate = () => this.changeCurrentDate(addDays(this.currentDate, 1));

  protected goToPreviousWeek = () => this.changeCurrentDate(addWeeks(this.currentDate, -1));

  protected goToNextWeek = () => this.changeCurrentDate(addWeeks(this.currentDate, 1));

  protected goToPreviousYear = () => this.changeCurrentDate(addYears(this.currentDate, -1));

  protected goToNextYear = () => this.changeCurrentDate(addYears(this.currentDate, 1));

  abstract update(calendar: Calendar);
}
