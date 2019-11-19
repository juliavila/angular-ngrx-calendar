import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './core/store';

import { AppComponent } from './core/app.component';
import { HeaderComponent } from './core/header/header.component';
import { CalendarContainerComponent } from './modules/calendar/compoments/calendar-container.component';
import { MonthlyCalendarComponent } from './modules/calendar/compoments/monthly-calendar.component';
import { SharedModule } from './shared/shared.module';
import { MiniCalendarComponent } from './shared/components/mini-calendar/mini-calendar.component';

const routes: Routes = [
  { path: '', component: CalendarContainerComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CalendarContainerComponent,
    MonthlyCalendarComponent,
    MiniCalendarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
