import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { v1 as uuidv1 } from 'uuid';
import { ICar } from '../cars/cars.model';
import { LocalStorageService } from '../../core/services/local-storage.service';

@Component({
  selector: 'app-car-info',
  standalone: true,
  imports: [MatInputModule, MatButton, ReactiveFormsModule],
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.scss'
})
export class AddCarComponent {
  public form = new FormGroup({
    id: new FormControl(uuidv1()),
    name: new FormControl(''),
    link: new FormControl(''),
    options: new FormControl(''),
    comment: new FormControl('')
  });

  constructor(private localStorageService: LocalStorageService, private router: Router) {}

  public onSubmit(): void {
    this.localStorageService.addItem(this.form.value as ICar);
    this.router.navigateByUrl('/');
    console.log(this.form.value)
  }

  public cancel(): void {
    this.router.navigateByUrl('/');
  }
}
