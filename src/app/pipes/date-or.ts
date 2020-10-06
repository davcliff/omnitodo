import { DatePipe } from '@angular/common';
import { Inject, Injectable, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'dateOr' })
export class DateOrPipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private locale: string) { }
  transform(value: any, msg: string, ...args: any[]): string {
    if (!value) {
      return msg || 'Unknown';
    } else {
      return new DatePipe(this.locale).transform(value);
    }
  }

}
