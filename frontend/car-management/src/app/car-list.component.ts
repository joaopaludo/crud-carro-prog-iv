import { Component, OnInit } from '@angular/core';
import { CarService, Car } from './car-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h1>Gerenciamento de Carros</h1>
      
      <form (ngSubmit)="onSubmit()" class="car-form">
        <input 
          [(ngModel)]="currentCar.modelo" 
          name="modelo" 
          placeholder="Modelo" 
          required
        >
        <input 
          [(ngModel)]="currentCar.marca" 
          name="marca" 
          placeholder="Marca" 
          required
        >
        <input 
          type="number" 
          [(ngModel)]="currentCar.ano" 
          name="ano" 
          placeholder="Ano" 
          required
        >
        <input 
          [(ngModel)]="currentCar.cor" 
          name="cor" 
          placeholder="Cor" 
          required
        >
        <button type="submit">
          {{ isEditing ? 'Atualizar' : 'Adicionar' }}
        </button>
        <button 
          *ngIf="isEditing" 
          type="button" 
          (click)="cancelEdit()"
        >
          Cancelar
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Modelo</th>
            <th>Marca</th>
            <th>Ano</th>
            <th>Cor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let car of cars">
            <td>{{ car.id }}</td>
            <td>{{ car.modelo }}</td>
            <td>{{ car.marca }}</td>
            <td>{{ car.ano }}</td>
            <td>{{ car.cor }}</td>
            <td>
              <button (click)="editCar(car)">Editar</button>
              <button (click)="deleteCar(car.id!)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }

    .car-form {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }

    .car-form input {
      margin: 0 5px;
      padding: 8px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: center;
    }

    button {
      margin: 0 5px;
      padding: 5px 10px;
      background-color: #4CAF50;
      color: white;
      border: none;
      cursor: pointer;
    }

    button:nth-child(2) {
      background-color: #f44336;
    }
  `]
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];
  currentCar: Car = this.resetCar();
  isEditing = false;

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.loadCars();
  }

  loadCars() {
    this.carService.getCars().subscribe({
      next: (cars: Array<Car>) => this.cars = cars,
      error: (err: any) => console.error('Erro ao carregar carros', err)
    });
  }

  onSubmit() {
    if (this.isEditing) {
      this.updateCar();
    } else {
      this.addCar();
    }
  }

  addCar() {
    this.carService.createCar(this.currentCar).subscribe({
      next: (car: Car) => {
        this.cars.push(car);
        this.currentCar = this.resetCar();
      },
      error: (err: any) => console.error('Erro ao adicionar carro', err)
    });
  }

  editCar(car: Car) {
    this.currentCar = { ...car };
    this.isEditing = true;
  }

  updateCar() {
    this.carService.updateCar(this.currentCar).subscribe({
      next: (updatedCar: any) => {
        const index = this.cars.findIndex(c => c.id === updatedCar.id);
        this.cars[index] = updatedCar;
        this.cancelEdit();
      },
      error: (err: any) => console.error('Erro ao atualizar carro', err)
    });
  }

  deleteCar(id: number) {
    this.carService.deleteCar(id).subscribe({
      next: () => {
        this.cars = this.cars.filter(car => car.id !== id);
      },
      error: (err: any) => console.error('Erro ao excluir carro', err)
    });
  }

  cancelEdit() {
    this.currentCar = this.resetCar();
    this.isEditing = false;
  }

  private resetCar(): Car {
    return {
      model: '',
      brand: '',
      year: new Date().getFullYear(),
      color: ''
    };
  }
}