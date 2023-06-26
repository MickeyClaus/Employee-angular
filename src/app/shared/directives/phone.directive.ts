import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[phoneNumberFormat]'
})
export class PhoneNumberFormatDirective {
  constructor(private el: ElementRef) { }

  @HostListener('input')
  onInput() {
    const inputValue: string = this.el.nativeElement.value;
    const formattedValue = this.formatPhoneNumber(inputValue);
    this.el.nativeElement.value = formattedValue;
  }

  private formatPhoneNumber(value: string): string {
    const numericValue = value.replace(/\D/g, '');
    const countryCode = numericValue.slice(0, 1);
    const areaCode = numericValue.slice(1, 4);
    const firstPart = numericValue.slice(4, 7);
    const secondPart = numericValue.slice(7, 9);
    const lastPart = numericValue.slice(9);

    return `+${countryCode} (${areaCode}) ${firstPart}-${secondPart}-${lastPart}`;
  }
}