import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/store';
import { getCalendar } from 'src/app/core/store/calendar/calendar.selector';
import { Calendar } from 'src/app/core/store/calendar/calendar.reducer';
import { Observable } from 'rxjs';
import { changeViewMode } from 'src/app/core/store/calendar/calendar.actions';
import { ViewMode } from 'src/app/shared/components/calendar-tools/calendar.api';

@Component({
  selector: 'app-view-mode',
  templateUrl: './view-mode.component.html',
  styleUrls: ['./view-mode.component.scss']
})

export class ViewModeComponent implements OnInit {

  viewMode = ViewMode;

  viewModeSelected: ViewMode;
  calendar: Observable<Calendar>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.pipe(select(getCalendar)).subscribe(c => this.viewModeSelected = c.viewMode);
  }

  submitForm(form: NgForm) {
    this.store.dispatch(changeViewMode({ viewMode: form.value.viewMode }));
  }

}
