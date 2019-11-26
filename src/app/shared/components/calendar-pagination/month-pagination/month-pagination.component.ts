import { Component } from '@angular/core';
import { Months } from '../../calendar-tools/calendar.api';
import { getMonth } from 'date-fns';
import { CalendarPaginationComponent } from '../calendar-pagination.component';

@Component({
  selector: 'app-month-pagination',
  templateUrl: './month-pagination.component.html',
  styleUrls: ['./month-pagination.component.scss']
})

export class MonthPaginationComponent extends CalendarPaginationComponent {

  months = Months;
  currentMonth = 0;
  update = ({ date }) => this.currentMonth = getMonth(date);
}
