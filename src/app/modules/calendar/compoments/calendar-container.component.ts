import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { open } from 'src/app/core/store/calendar/calendar.actions';
import { Observable } from 'rxjs';
import { Calendar } from 'src/app/core/store/calendar/calendar.reducer';
import { AppState } from 'src/app/core/store';
import { getCalendar } from 'src/app/core/store/calendar/calendar.selector';
import { ViewMode } from 'src/app/shared/components/calendar-tools/calendar.api';

@Component({
  selector: 'app-calendar-container',
  templateUrl: './calendar-container.component.html',
  styleUrls: ['./calendar-container.component.scss']
})
export class CalendarContainerComponent implements OnInit {

  viewMode = ViewMode;

  viewModeSelected: ViewMode;
  calendar: Observable<Calendar>;

  constructor(
    private store: Store<AppState>
  ) {
    // Debug
    store.select(s => s).subscribe(val => console.log('State', val));
  }

  ngOnInit() {
    this.calendar = this.store.pipe(select(getCalendar));
    this.calendar.subscribe(c => this.viewModeSelected = c.viewMode);
    this.openCalendar();
  }

  openCalendar() {
    this.store.dispatch(open({
      viewMode: ViewMode.Monthly,
      date: new Date(Date.now())
    }));
  }
}

