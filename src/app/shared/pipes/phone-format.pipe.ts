import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }

    const countryCode = '+7';
    const areaCode = value.slice(1, 4);
    const prefix = value.slice(4, 7);
    const line1 = value.slice(7, 9);
    const line2 = value.slice(9, 11);

    return `${countryCode} (${areaCode}) ${prefix}-${line1}-${line2}`;
  }
}