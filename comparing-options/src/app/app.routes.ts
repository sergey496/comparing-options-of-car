import { Routes } from '@angular/router';
import { AddCarComponent } from './add-car/add-car.component';
import { CarsComponent } from './cars/cars.component';

export const routes: Routes = [
    {
        title: 'add car',
        path: 'add-car',
        pathMatch: 'full',
        component: AddCarComponent,
    },
    {
        title: 'compare cars',
        path: 'compare-cars',
        pathMatch: 'full',
        component: CarsComponent,
    }
];
