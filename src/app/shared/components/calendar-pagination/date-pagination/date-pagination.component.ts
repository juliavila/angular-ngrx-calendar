import { Component } from '@angular/core';
import { CalendarPaginationComponent } from '../calendar-pagination.component';

@Component({
  selector: 'app-date-pagination',
  templateUrl: './date-pagination.component.html'
})

export class DatePaginationComponent extends CalendarPaginationComponent {
  update() { }
}
