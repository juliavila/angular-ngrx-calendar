import { Component } from '@angular/core';
import { IMonth } from './calendar.api';
import { addMonths, differenceInCalendarDays, differenceInCalendarMonths, getDay, getDaysInMonth, getMonth, getYear } from 'date-fns';

@Component({})
export abstract class CalendarToolsComponent {

  sliceLastMonth = (last: IMonth, current: IMonth): number[] => last.days.slice(last.days.length - current.startsAt, last.days.length);

  sliceNextMonth = (next: IMonth, current: IMonth): number[] => next.days.slice(0, 7 - (current.days.length + current.startsAt) % 7);

  generateNumberArray = (total: number): number[] => Array(total).fill(null).map((n, index) => ++index);

  isMonthOfToday = (year: number, month: number): boolean => !differenceInCalendarMonths(Date.now(), new Date(year, month));

  isToday = (month: IMonth, day: number): boolean => !differenceInCalendarDays(Date.now(), new Date(month.year, month.month, day));

  updateCurrentMoth = (currentDate: Date): IMonth => this.updateMonth(currentDate);

  updateLastMonth = (currentDate: Date): IMonth => this.updateMonth(addMonths(currentDate, -1));

  updateNextMonth = (currentDate: Date): IMonth => this.updateMonth(addMonths(currentDate, 1));

  private updateMonth(date: Date) {
    return {
      startsAt: getDay(date),
      year: getYear(date),
      month: getMonth(date),
      days: this.generateNumberArray(getDaysInMonth(date))
    };
  }

}
