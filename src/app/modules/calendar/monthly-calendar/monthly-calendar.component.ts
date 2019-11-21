import { OnInit, Component } from '@angular/core';
import { CalendarToolsComponent } from 'src/app/shared/components/calendar-tools/calendar-tools.component';
import { IMonth, Weeks } from 'src/app/shared/components/calendar-tools/calendar.api';
import { startOfMonth } from 'date-fns';

interface IMonthDay {
  day: number;
  cssClass: string;
}

@Component({
  selector: 'app-monthly-calendar',
  templateUrl: './monthly-calendar.component.html',
  styleUrls: ['./monthly-calendar.component.scss']
})

export class MonthlyCalendarComponent extends CalendarToolsComponent implements OnInit {

  weeks = Weeks;

  currentDate: Date;
  days: IMonthDay[][] = [];

  ngOnInit() {
    this.updateMonths(startOfMonth(Date.now()));
  }

  updateMonths(currentDate: Date): void {
    this.currentDate = currentDate;

    const currentMonth = this.updateCurrentMoth(currentDate);

    const lastMonth = this.updateLastMonth(currentDate);
    const nextMonth = this.updateNextMonth(currentDate);

    const lastMonthDays = this.sliceLastMonth(lastMonth, currentMonth);
    const nextMonthDays = this.sliceNextMonth(nextMonth, currentMonth);

    const daysList = this.buildMonth(lastMonthDays, 'last')
      .concat(this.setToday(this.buildMonth(currentMonth.days, ''), currentMonth))
      .concat(this.buildMonth(nextMonthDays, 'next'));

    let i = 0;
    while (i < 35) {
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
