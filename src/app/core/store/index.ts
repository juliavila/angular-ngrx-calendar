import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { calendarReducer, CalendarState } from './calendar/calendar.reducer';

export interface AppState {
  calendar: CalendarState;
}

export const reducers: ActionReducerMap<AppState> = {
  calendar: calendarReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
