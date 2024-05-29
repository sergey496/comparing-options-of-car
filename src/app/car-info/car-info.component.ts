import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { ICar } from '../cars/cars.model';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-car-info',
  standalone: true,
  imports: [MatMenuModule, CommonModule, MatButtonModule],
  templateUrl: './car-info.component.html',
  styleUrl: './car-info.component.scss'
})
export class CarInfoComponent {
  @Input() public options: string[] = [];
  @Output() chooseItem = new EventEmitter();
  public cars: ICar[] = [];
  public hasCars: boolean = false;
  public carData: ICar | undefined;
  public cars$ = this.localStorageService.cars$.pipe(filter(Boolean), map(item => Object.values(item)));

  constructor(private localStorageService: LocalStorageService) { }

  public ngOnInit(): void {
    const data = this.localStorageService.getItem('cars') as ICar[];
    if (data) {
      this.cars = Object.values(data);
      this.hasCars = !!Object.values(this.cars).length;
    }
  }

  public chooseCar (data: ICar): void {
    this.chooseItem.emit(data);
    this.carData = data;
  }

  public removeCar(data: ICar): void {
    this.localStorageService.removeItem('cars', data.id);
  }
}
