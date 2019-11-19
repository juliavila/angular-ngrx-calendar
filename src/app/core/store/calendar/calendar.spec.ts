import { calendarReducer, initialState } from './calendar.reducer';
import * as actions from './calendar.actions';

describe('Calendar store', () => {

  it('should open a calendar', () => {
    const date = new Date();
    const room = 'room-123';
    const action = actions.open({ room, date });

    const newState = calendarReducer(initialState, action);

    expect(newState).toBeDefined();
    expect(newState).not.toBe(initialState);

    expect(newState.calendars).toBeDefined();
    expect(newState.calendars.length).toEqual(1);
    expect(newState.calendars[0].room).toEqual(room);
    expect(newState.calendars[0].date).toEqual(date);
  });
});
