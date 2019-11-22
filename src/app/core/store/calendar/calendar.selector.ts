import { Store, createSelector } from '@ngrx/store';
import { AppState } from '..';

export const getCalendar = (state: AppState) => state.calendar.calendar;
