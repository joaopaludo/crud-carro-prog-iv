import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarListComponent } from '../car-list/car-list.component';

@Component({
    selector: 'app-component',
    imports: [CommonModule, FormsModule, CarListComponent],
    templateUrl: 'app.component.html',
    styles: []
})
export class AppComponent {
}
