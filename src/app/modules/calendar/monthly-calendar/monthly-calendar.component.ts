import { OnInit, Component } from '@angular/core';
import { CalendarToolsComponent } from 'src/app/shared/components/calendar-tools/calendar-tools.component';
import { IMonth, Weeks } from 'src/app/shared/components/calendar-tools/calendar.api';
import { startOfMonth, addDays, differenceInCalendarDays, getDay, differenceInCalendarMonths, getDate } from 'date-fns';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/store';
import { getCalendar } from 'src/app/core/store/calendar/calendar.selector';
import { IDisplayInCalendar } from 'src/app/shared/components/calendar-event/calendar-event.component';

// TODO: passar essas interfaces para um arquivo adequado

export interface IEvent {
  startsAt: Date;
  endsIn: Date;
  allDay: boolean;
}

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

  // TODO: mock
  today = new Date(2019, 10, 6);

  event1: IEvent = {
    startsAt: new Date(2019, 9, 28),
    endsIn: addDays(this.today, 2),
    allDay: false
  };

  event2: IEvent = {
    startsAt: addDays(this.today, 0),
    endsIn: addDays(this.today, 20),
    allDay: false
  };

  displays: IDisplayInCalendar[] = [];

  constructor(private store: Store<AppState>) {
    super();
  }

  ngOnInit() {
    this.updateMonths(new Date(Date.now()));
    this.store.pipe(select(getCalendar)).subscribe(({ date }) => this.updateMonths(startOfMonth(date)));

    // TODO: remover daqui
    this.transformEventInDisplay(this.event1);
    this.transformEventInDisplay(this.event2);
  }

  calculateOrder(x: number, y: number, offset: number) {
    const x2 = x + offset;
    const overlap = this.displays.filter(d =>
      (d.y === y && ((d.x >= x && d.x <= x2) || ((d.x + offset) >= x && (d.x + offset) <= x2))));
    return overlap.length ? Math.max(...overlap.map(o => o.order)) + 1 : 0;
  }

  // TODO: nome horroroso, trocar
  transformEventInDisplay(event: IEvent) {
    console.log('event', event);
    const intervalInDays = differenceInCalendarDays(event.endsIn, event.startsAt);
    const weekDayStart = getDay(event.startsAt);

    this.splitEventIntoRows(event.startsAt, weekDayStart, intervalInDays);
  }

  splitEventIntoRows(startsAt: Date, weekDayStart: number, intervalInDays: number) {

    const rest = weekDayStart + intervalInDays - 6; // 6 porque a semana vai de 0 a 6

    if (rest > 0) {
      intervalInDays = intervalInDays - rest;
    }

    this.createDisplay(startsAt, weekDayStart, intervalInDays);

    if (rest > 0) {
      const nextDate: Date = addDays(startsAt, intervalInDays + 1);
      this.splitEventIntoRows(nextDate, 0, rest - 1);
    }
  }

  createDisplay(startsAt: Date, weekDayStart: number, offset: number) {
    const intialMonth = differenceInCalendarMonths(startsAt, this.currentDate);
    const initalDay = getDate(startsAt);
    let y: number;

    if (intialMonth === 0) {
      this.days.forEach((row, index) => {
        if (row.find(day => day.day === initalDay && day.cssClass.includes('current'))) {
          y = index;
        }
      });
    } else {
      y = intialMonth < 0 ? 0 : 4;
    }

    const display: IDisplayInCalendar = {
      x: weekDayStart,
      y,
      offset,
      order: this.calculateOrder(weekDayStart, y, offset),
      startIsContinued: false,
      endIsContinued: false,
    };
    this.displays.push(display);
  }

  updateMonths = (date: Date): void => {
    this.currentDate = startOfMonth(date);

    const currentMonth = this.updateCurrentMoth(date);

    const lastMonth = this.updateLastMonth(date);
    const nextMonth = this.updateNextMonth(date);

    const lastMonthDays = this.sliceLastMonth(lastMonth, currentMonth);
    const nextMonthDays = this.sliceNextMonth(nextMonth, currentMonth);

    const daysList = this.buildMonth(lastMonthDays, 'last')
      .concat(this.setToday(this.buildMonth(currentMonth.days, 'current'), currentMonth))
      .concat(this.buildMonth(nextMonthDays, 'next'));

    let i = 0;
    this.days = Array(totalWeeks).fill(0).map(() => daysList.slice(i, i += 7));
  }

  buildMonth = (month: number[], cssClass: string): IMonthDay[] => month.map(day => ({ day, cssClass }));

  setToday(month: IMonthDay[], currentMonth: IMonth): IMonthDay[] {
    return month.map(m => {
      if (this.isToday(currentMonth, m.day)) {
        m.cssClass += ' today';
      }
      return m;
    });
  }
}
