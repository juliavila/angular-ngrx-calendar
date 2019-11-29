import { Component, OnInit, Input } from '@angular/core';
import { getLocaleDateTimeFormat, NgStyle } from '@angular/common';
import { addDays } from 'date-fns';

// TODO: colocar em um arquivo adequado

export enum EventStatus {
  PRE_RESERVA,
  RESERVA,
  CANCELADO
}

export enum EventCategory {
  EVENTO,
  CURSO,
  SINALIZAÇÃO
}

export enum EventType {
  INTERNO,
  EXTERNO
}

export interface IDisplayInCalendar {
  x: number;
  y: number;
  offset: number;
  order: number;
  startIsContinued: boolean;
  endIsContinued: boolean;
}

@Component({
  selector: 'app-calendar-event',
  templateUrl: './calendar-event.component.html',
  styleUrls: ['./calendar-event.component.scss']
})

export class CalendarEventComponent implements OnInit {

  @Input() display: IDisplayInCalendar;

  // TODO: este é o mensal
  height = '18px';
  dateHeaderHeight = '22px';
  dateHeight = '20%'; // 100% / (total de linhas = 5)
  dateWidht = '14.285%'; // 100% / (total de colunas = 7)

  style;

  ngOnInit() {

    this.style = {
      /** TODO: deixar código mais claro.
       * Para calcular a altura é levado em consideração:
       * a linha em que está (dateHeight * display. y)
       * o tamanho do header da data (dateHeaderHeight)
       * e a ordem de exibição dos registros (height * display.order).
       */
      top: `calc(${this.dateHeight} * ${this.display.y} + ${this.dateHeaderHeight} + (${this.height} * ${this.display.order}))`,
      left: `calc(${this.dateWidht} * ${this.display.x})`,
      width: `calc(${this.dateWidht} * ${this.display.offset + 1})`
    };
  }
}
