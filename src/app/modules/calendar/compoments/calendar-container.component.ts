import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { open } from 'src/app/core/store/calendar/calendar.actions';
import { Observable } from 'rxjs';
import { CalendarState, Calendar } from 'src/app/core/store/calendar/calendar.reducer';
import { AppState } from 'src/app/core/store';
import { getAllCalendars } from 'src/app/core/store/calendar/calendar.selector';

@Component({
  selector: 'app-calendar-container',
  templateUrl: './calendar-container.component.html',
  styleUrls: ['./calendar-container.component.scss']
})
export class CalendarContainerComponent implements OnInit {

  calendars: Observable<Calendar[]>;

  constructor(
    private store: Store<AppState>
  ) {
    // Debug
    store.select(s => s).subscribe(val => console.log('State', val));
  }

  ngOnInit() {
    this.calendars = this.store.pipe(select(getAllCalendars));
  }

  openCalendar() {
    this.store.dispatch(open({
      room: `sala-${Date.now()}`,
      date: new Date()
    }));
  }
}

