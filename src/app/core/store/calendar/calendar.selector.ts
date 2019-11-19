import { Store, createSelector } from '@ngrx/store';
import { AppState } from '..';

export const getAllCalendars = (state: AppState) => state.calendar.calendars;

export const getCalendar = (room: string) => createSelector(
  getAllCalendars,
  calendars => calendars.find(c => c.room === room)
);
