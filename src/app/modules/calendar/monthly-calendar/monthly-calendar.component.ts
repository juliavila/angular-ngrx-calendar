import { OnInit, Component } from '@angular/core';
import { CalendarToolsComponent } from 'src/app/shared/components/calendar-tools/calendar-tools.component';
import { IMonth, Weeks, DaysOfWeek } from 'src/app/shared/components/calendar-tools/calendar.api';
import { startOfMonth } from 'date-fns';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/store';
import { getCalendar } from 'src/app/core/store/calendar/calendar.selector';

interface IMonthDay {
  day: number;
  cssClass: string;
}

const totalWeeks = 5;

@Component({
  selector: 'app-monthly-calendar',
  templateUrl: './monthly-calendar.component.html',
  styleUrls: ['./monthly-calendar.component.scss']
})

export class MonthlyCalendarComponent extends CalendarToolsComponent implements OnInit {

  weeks = Weeks;

  currentDate: Date;
  days: IMonthDay[][] = [];

  constructor(private store: Store<AppState>) {
    super();
  }

  ngOnInit() {
    this.updateMonths(new Date(Date.now()));
    this.store.pipe(select(getCalendar)).subscribe(c => this.updateMonths(startOfMonth(c.date)));
  }

  updateMonths(currentDate: Date): void {
    this.currentDate = startOfMonth(currentDate);

    const currentMonth = this.updateCurrentMoth(currentDate);

    const lastMonth = this.updateLastMonth(currentDate);
    const nextMonth = this.updateNextMonth(currentDate);

    const lastMonthDays = this.sliceLastMonth(lastMonth, currentMonth);
    const nextMonthDays = this.sliceNextMonth(nextMonth, currentMonth);

    const daysList = this.buildMonth(lastMonthDays, 'last')
      .concat(this.setToday(this.buildMonth(currentMonth.days, ''), currentMonth))
      .concat(this.buildMonth(nextMonthDays, 'next'));

    this.days = [];

    let i = 0;
    while (i < DaysOfWeek * totalWeeks) {
      this.days.push(daysList.slice(i, i += 7));
    }
  }

  buildMonth = (month: number[], cssClass: string): IMonthDay[] => month.map(day => ({ day, cssClass }));

  setToday(month: IMonthDay[], currentMonth: IMonth): IMonthDay[] {
    return month.map(m => {
      if (this.isToday(currentMonth, m.day)) {
        m.cssClass = 'today';
      }
      return m;
    });
  }
}
