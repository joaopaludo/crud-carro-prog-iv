import { Component, OnInit } from '@angular/core';
import { CarService, Carro } from './car-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'car-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: 'car-list.component.html',
  styleUrls: ['car-list.component.css']
})
export class CarListComponent implements OnInit {
  carros: Carro[] = [];
  currentCar: Carro = this.resetCar();
  isEditing = false;

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.loadCars();
  }

  loadCars() {
    this.carService.getCarros().subscribe({
      next: (cars: Array<Carro>) => this.carros = cars,
      error: (err: any) => console.error('Erro ao carregar carros', err)
    });
  }

  onSubmit() {
    if (this.isEditing) {
      this.updateCarro();
    } else {
      this.addCarro();
    }
  }

  addCarro() {
    this.carService.createCarro(this.currentCar).subscribe({
      next: (car: Carro) => {
        this.carros.push(car);
        this.currentCar = this.resetCar();
      },
      error: (err: any) => console.error('Erro ao adicionar carro', err)
    });
  }

  editCarro(car: Carro) {
    this.currentCar = { ...car };
    this.isEditing = true;
  }

  updateCarro() {
    this.carService.updateCarro(this.currentCar).subscribe({
      next: (updatedCar: any) => {
        const index = this.carros.findIndex(c => c.id === updatedCar.id);
        this.carros[index] = updatedCar;
        this.cancelEdit();
      },
      error: (err: any) => console.error('Erro ao atualizar carro', err)
    });
  }

  deleteCarro(id: number) {
    this.carService.deleteCarro(id).subscribe({
      next: () => {
        this.carros = this.carros.filter(car => car.id !== id);
      },
      error: (err: any) => console.error('Erro ao excluir carro', err)
    });
  }

  cancelEdit() {
    this.currentCar = this.resetCar();
    this.isEditing = false;
  }

  private resetCar(): Carro {
    return {
      modelo: '',
      marca: '',
      ano: new Date().getFullYear(),
      cor: ''
    };
  }
}