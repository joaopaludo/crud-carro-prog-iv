import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { CarListComponent } from './app/car-list.component';

bootstrapApplication(CarListComponent, appConfig)
  .catch((err) => console.error(err));