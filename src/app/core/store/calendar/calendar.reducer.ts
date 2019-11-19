import { open } from './calendar.actions';
import { createReducer, on } from '@ngrx/store';

export interface Event {
  title: string;
  date: Date;
}

export interface Calendar {
  room: string;
  date: Date;
  events: Event[];
}

export interface CalendarState {
  calendars: Calendar[];
}

export const initialState: CalendarState = {
  calendars: []
};

const calendarActionReducer = createReducer(initialState,
  on(open, (state, { room, date }) => {
    const newCalendar: Calendar = {
      room,
      date,
      events: [],
    };

    return {
      calendars: [...state.calendars, newCalendar]
    };
  }),
);

export function calendarReducer(state, action) {
  return calendarActionReducer(state, action);
}
