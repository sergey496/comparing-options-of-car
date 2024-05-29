import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompareService {
  private options: { [key: string]: string } = {};

  public compareOptions(firstCar: string, secondCar: string): { first: string[], second: string[], commonOptions: string[] } {

    const comparedOptions = this.compare(this.getUnicCodes(firstCar), this.getUnicCodes(secondCar));
    const firstUniqCar = comparedOptions.firstCarUnicOptions.map((item: string) => `${item}, ${this.options[item]}`);
    const secondUniqCar = comparedOptions.secondCarUnicOptions.map((item: string) => `${item}, ${this.options[item]}`);
    const commonOptions = comparedOptions.commonOptions.map((item: string) => `${item}, ${this.options[item]}`)
    return { first: firstUniqCar, second: secondUniqCar, commonOptions }
  }


  private getUnicCodes(a: string): string[] {
    const arr = a.split(new RegExp('[\t\n]'));
    const temp: string[] = [];
    arr.forEach((item, idx) => {
      if (item === arr[idx + 1] && item.length === 3) {
        temp.push(item);
        if (!this.options[item]) {
          this.options[item] = arr[idx + 2];
        }
      }
    })
    return temp;
  }

  private compare(a: string[], b: string[]) {
    const firstCarUnicOptions: string[] = [];
    const secondCarUnicOptions: string[] = [];
    const commonOptions: string[] = [];
    a.forEach(item => {
      if (!b.includes(item)) {
        firstCarUnicOptions.push(item);
      } else {
        commonOptions.push(item);
      }
    })
    b.forEach(item => {
      if (!a.includes(item)) {
        secondCarUnicOptions.push(item);
      }
    })
    return { firstCarUnicOptions, secondCarUnicOptions, commonOptions }
  }

  // const comparedOptions = compare(getUnicCodes(a), getUnicCodes(b));
  // comparedOptions.temp.forEach(item => console.log(item, options[item]));
  // console.log("______________")
  // comparedOptions.temp1.forEach(item => console.log(options[item]
}
