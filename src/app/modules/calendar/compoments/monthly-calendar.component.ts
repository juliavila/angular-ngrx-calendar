import { Component, Input, OnInit } from '@angular/core';
import { getCalendar } from 'src/app/core/store/calendar/calendar.selector';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store';
import { Calendar } from 'src/app/core/store/calendar/calendar.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-monthly-calendar',
  templateUrl: './monthly-calendar.component.html',
  styleUrls: ['./monthly-calendar.component.scss']
})
export class MonthlyCalendarComponent implements OnInit {
  @Input() room: string;

  calendar: Observable<Calendar>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.calendar = this.store.pipe(select(getCalendar(this.room)));
  }

}
