import { calendarReducer, initialState } from './calendar.reducer';
import * as actions from './calendar.actions';
import { ViewMode } from 'src/app/shared/components/calendar-tools/calendar.api';

describe('Calendar store', () => {

  it('should open a calendar', () => {
    const date = new Date();
    const viewMode = ViewMode.Monthly;
    const action = actions.open({ date, viewMode });

    const newState = calendarReducer(initialState, action);

    expect(newState).toBeDefined();
    expect(newState).not.toBe(initialState);

    expect(newState.calendar).toBeDefined();
    expect(newState.calendar.date).toEqual(date);
    expect(newState.calendar.viewMode).toEqual(viewMode);
  });
});
