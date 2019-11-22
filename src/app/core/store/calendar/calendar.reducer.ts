import { open, changeDate, changeViewMode } from './calendar.actions';
import { createReducer, on } from '@ngrx/store';
import { ViewMode } from 'src/app/shared/components/calendar-tools/calendar.api';

export interface Event {
  title: string;
  date: Date;
}

export interface Calendar {
  // room: string;
  date: Date;
  viewMode: ViewMode;
  events?: Event[];
}

export interface CalendarState {
  calendar: Calendar;
}

export const initialState: CalendarState = {
  calendar: {
    date: new Date(),
    events: [],
    viewMode: null,
  },
};

const calendarActionReducer = createReducer(initialState,
  on(open, (state, { date, viewMode }) => {
    const calendar = { date, viewMode };
    return { ...state, calendar };
  }),
  on(changeDate, (state, { date }) => {
    const calendar = { ...state.calendar };
    calendar.date = date;
    return { ...state, calendar };
  }),
  on(changeViewMode, (state, { viewMode }) => {
    const calendar = { ...state.calendar };
    calendar.viewMode = viewMode;
    return { ...state, calendar };
  }),
);

export function calendarReducer(state, action) {
  return calendarActionReducer(state, action);
}
