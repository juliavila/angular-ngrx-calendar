import { createAction, props } from '@ngrx/store';
import { ViewMode } from 'src/app/shared/components/calendar-tools/calendar.api';

export const open = createAction('[Calendar] Open', props<{ date: Date, viewMode: ViewMode }>());
export const changeViewMode = createAction('[Calendar] Change ViewMode', props<{ viewMode: ViewMode }>());
export const changeDate = createAction('[Calendar] Change Date', props<{ date: Date }>());
// TODO: vamos usar?
export const addEvent = createAction('[Calendar] Add event', props<{ room: string, date: Date }>());

