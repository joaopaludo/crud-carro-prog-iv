import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Car {
    id?: number;
    modelo: string;
    marca: string;
    ano: number;
    cor: string;
}

@Injectable({
    providedIn: 'root'
})
export class CarService {
    private apiUrl = 'http://localhost:3000/carros';

    constructor(private http: HttpClient) { }

    getCars(): Observable<Car[]> {
        return this.http.get<Car[]>(this.apiUrl);
    }

    createCar(car: Car): Observable<Car> {
        return this.http.post<Car>(this.apiUrl, car);
    }

    updateCar(car: Car): Observable<Car> {
        return this.http.put<Car>(`${this.apiUrl}/${car.id}`, car);
    }

    deleteCar(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}