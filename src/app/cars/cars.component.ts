import { Component, EventEmitter, Output } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { ICar } from './cars.model';
import { CommonModule } from '@angular/common';
import { CarInfoComponent } from '../car-info/car-info.component';
import { CompareService } from '../../core/services/compare.service';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [MatButtonModule, CommonModule, CarInfoComponent],
  providers: [LocalStorageService],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.scss'
})
export class CarsComponent {
  public cars: ICar[] = [];
  public hasCars: boolean = false;
  public firstCar: ICar | undefined;
  public secondCar: ICar | undefined;
  public firstCarOptions: string[] = [];
  public secondCarOptions: string[] = [];
  public commonOptions: string[] = [];

  constructor(private localStorageService: LocalStorageService, private compareOptionsService: CompareService) { }

  public ngOnInit(): void {
    const data = this.localStorageService.getItem('cars') as ICar[];
    if (data) {
      this.cars = Object.values(data);
      this.hasCars = !!Object.values(this.cars).length;
    }
  }

  public chooseFirstCar(data: ICar): void {
    this.firstCar = data;
    this.compareCars();
    console.log(data);
  }

  public chooseSecondCar(data: ICar): void {
    this.secondCar = data;
    this.compareCars();
  }

  private compareCars(): void {
    if (this.firstCar && this.secondCar) {
      const { first, second, commonOptions } = this.compareOptionsService.compareOptions(this.firstCar.options, this.secondCar.options);
      this.firstCarOptions = first;
      this.secondCarOptions = second;
      this.commonOptions = commonOptions;
    } else {
      if (this.firstCar) {
        this.firstCarOptions = [this.firstCar.options];
      }
      if (this.secondCar) {
        this.secondCarOptions = [this.secondCar.options];
      }
    }
  }
}
