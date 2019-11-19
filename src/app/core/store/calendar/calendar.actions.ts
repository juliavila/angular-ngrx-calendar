import { createAction, props } from '@ngrx/store';

export const open = createAction('[Calendar] Open', props<{ room: string, date: Date }>());
export const addEvent = createAction('[Calendar] Add event', props<{ room: string, date: Date }>());

