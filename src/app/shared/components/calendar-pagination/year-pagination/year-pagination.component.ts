import { Component } from '@angular/core';
import { getYear } from 'date-fns';
import { CalendarPaginationComponent } from '../calendar-pagination.component';

@Component({
  selector: 'app-year-pagination',
  templateUrl: './year-pagination.component.html',
  styleUrls: ['./year-pagination.component.scss']
})

export class YearPaginationComponent extends CalendarPaginationComponent {

  currentYear = 0;
  update = ({ date }) => this.currentYear = getYear(date);
}
