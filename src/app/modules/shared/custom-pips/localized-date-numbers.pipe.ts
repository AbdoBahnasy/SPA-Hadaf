import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localizedDateNumbers',
  pure: false,
})
export class LocalizedDateNumbersPipe implements PipeTransform {
  transform(value: string): any {
    let isArabic: boolean = false;
    let lang = localStorage.getItem('lang');
    isArabic = lang == 'ar-SA' ? true : false;
    if (!isArabic) {
      return value;
    }
    let newValue = '';
    for (let i = 0; i < value.length; i++) {
      let ch = value.charCodeAt(i);
      if (ch >= 48 && ch <= 57) {
        let newChar = ch + 1584;
        newValue = newValue + String.fromCharCode(newChar);
      } else newValue = newValue + String.fromCharCode(ch);
    }
    return newValue;
  }
}
