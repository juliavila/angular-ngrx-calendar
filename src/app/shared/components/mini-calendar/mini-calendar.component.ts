import { Component, OnInit } from '@angular/core';
import {
  addMonths,
  addYears,
  differenceInCalendarDays,
  differenceInCalendarMonths,
  getDay,
  getDaysInMonth,
  getMonth,
  getYear,
  setMonth,
  startOfMonth
} from 'date-fns';

interface IMonth {
  startsAt?: number;
  month?: number;
  year?: number;
  days: number[];
}

enum Months {
  Janeiro = 0,
  Fevereiro = 1,
  Março = 2,
  Abril = 3,
  Maio = 4,
  Junho = 5,
  Julho = 6,
  Agosto = 7,
  Setembro = 8,
  Outubro = 9,
  Novembro = 10,
  Dezembro = 11,
}

enum ViewMode {
  days,
  months
}

@Component({
  selector: 'app-mini-calendar',
  templateUrl: './mini-calendar.component.html',
  styleUrls: ['./mini-calendar.component.scss']
})

export class MiniCalendarComponent implements OnInit {

  weeks = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  months = Months;
  monthsList = Object.entries(this.months).filter(m => typeof m[1] === 'number'); // TODO: tá complexo ainda;

  currentDate: Date;

  lastMonth: IMonth;
  currentMonth: IMonth;
  nextMonth: IMonth;

  lastMonthDays;
  nextMonthDays;

  viewMode = ViewMode;
  viewModeActive: ViewMode;

  ngOnInit() {
    this.viewModeActive = ViewMode.days;
    this.updateMonths(startOfMonth(Date.now()));
  }

  // TODO: utils

  sliceLastMonth = (last: IMonth, current: IMonth): number[] => last.days.slice(last.days.length - current.startsAt, last.days.length);

  sliceNextMonth = (next: IMonth, current: IMonth): number[] => next.days.slice(0, 7 - (current.days.length + current.startsAt) % 7);

  getDays = (total: number): number[] => Array(total).fill(null).map((n, index) => ++index);

  isMonthOfToday = (year: number, month: number): boolean => !differenceInCalendarMonths(Date.now(), new Date(year, month));

  isToday = (month: IMonth, day: number): boolean => !differenceInCalendarDays(Date.now(), new Date(month.year, month.month, day));

  // TODO: navigation

  goToNext() {
    const actions = {
      [ViewMode.days]: this.goToNextMonth,
      [ViewMode.months]: this.goToNextYear
    };

    actions[this.viewModeActive]();
  }

  goToPrevious() {
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

    this.currentMonth = {
      startsAt: getDay(currentDate),
      year: getYear(currentDate),
      month: getMonth(currentDate),
      days: this.getDays(getDaysInMonth(currentDate))
    };

    this.lastMonth = { days: this.getDays(getDaysInMonth(addMonths(currentDate, -1))) };
    this.nextMonth = { days: this.getDays(getDaysInMonth(addMonths(currentDate, 1))) };

    this.lastMonthDays = this.sliceLastMonth(this.lastMonth, this.currentMonth);
    this.nextMonthDays = this.sliceNextMonth(this.nextMonth, this.currentMonth);
  }
}
