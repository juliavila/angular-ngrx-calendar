export const HoursOfDay = 24;
export const DaysOfWeek = 7;

export interface IMonth {
  startsAt?: number;
  month?: number;
  year?: number;
  days: number[];
}

export interface IWeek {
  month: number;
  year: number;
  days: number[];
}

export interface IDay {
  year: number;
  month: number;
  week: number;
  day: number;
}

export const Weeks = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

export const Months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];
