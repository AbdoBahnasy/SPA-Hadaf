import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arabicNumbers',
  pure: false,
})
export class ArabicNumbersPipe implements PipeTransform {
  transform(n: number): string {
    let isArabic: boolean = false;
    let lang = localStorage.getItem('lang');
    isArabic = lang == 'ar-SA' ? true : false;
    if (n === null || n === undefined) {
      return '';
    }
    if (!isArabic) {
      return new Intl.NumberFormat('en-IN', {}).format(n);
    }
    return new Intl.NumberFormat('ar-SA', {}).format(n);
  }
}
