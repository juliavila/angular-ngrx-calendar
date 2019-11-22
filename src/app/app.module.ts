import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './core/store';

import { AppComponent } from './core/app.component';
import { HeaderComponent } from './core/header/header.component';
import { CalendarContainerComponent } from './modules/calendar/compoments/calendar-container.component';
import { SharedModule } from './shared/shared.module';
import { MiniCalendarComponent } from './shared/components/mini-calendar/mini-calendar.component';
import { MonthlyCalendarComponent } from './modules/calendar/monthly-calendar/monthly-calendar.component';
import { SidebarComponent } from './modules/sidebar/sidebar.component';
import { WeeklyCalendarComponent } from './modules/calendar/weekly-calendar/weekly-calendar.component';
import { DailyCalendarComponent } from './modules/calendar/daily-calendar/daily-calendar.component';
import { ViewModeComponent } from './modules/calendar/view-mode/view-mode.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: CalendarContainerComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CalendarContainerComponent,
    MonthlyCalendarComponent,
    WeeklyCalendarComponent,
    DailyCalendarComponent,
    MiniCalendarComponent,
    SidebarComponent,
    ViewModeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
