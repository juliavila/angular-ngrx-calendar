import { Component } from '@angular/core';
import { CalendarPaginationComponent } from '../calendar-pagination.component';

@Component({
  selector: 'app-week-pagination',
  templateUrl: './week-pagination.component.html'
})

export class WeekPaginationComponent extends CalendarPaginationComponent {
  update() { }
}
