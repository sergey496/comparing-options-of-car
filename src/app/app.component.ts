import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CarsComponent } from './cars/cars.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CarsComponent, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private route: Router) {}
  
  public addCar(): void {
    this.route.navigateByUrl('/add-car');
  }

  public compareCars(): void {
    this.route.navigateByUrl('/compare-cars');
  }
}
