import { Injectable } from '@angular/core';
import { ICar } from '../../app/cars/cars.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public cars$ = new BehaviorSubject<{[key: string]: ICar}>({});
  public getItem(key: string) {
    const data = localStorage.getItem(key);
    if (data?.length) {
      this.cars$.next(JSON.parse(data));
      return JSON.parse(data);
    } else {
      console.log('nothing saved');
      this.cars$.next({});
      return {};
    }
  }

  public addItem(data: ICar): void {
    const cars = this.getItem('cars');
    cars[data.id] = data;
    this.cars$.next(cars);
    localStorage.setItem('cars', JSON.stringify(cars));
  }

  public setItem(data: {[key: string]: ICar}): void {
    this.cars$.next(data);
    localStorage.setItem('cars', JSON.stringify(data));
  }

  public removeItem(key: string, id: string): void {
    const data = this.getItem('cars');
    if (data[id]) {
      delete data[id];
      this.setItem(data);
    }
  }
}
