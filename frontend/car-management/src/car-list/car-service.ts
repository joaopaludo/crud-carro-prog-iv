import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Carro {
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

    getCarros(): Observable<Carro[]> {
        return this.http.get<Carro[]>(this.apiUrl);
    }

    createCarro(carro: Carro): Observable<Carro> {
        return this.http.post<Carro>(this.apiUrl, carro);
    }

    updateCarro(carro: Carro): Observable<Carro> {
        return this.http.put<Carro>(`${this.apiUrl}/${carro.id}`, carro);
    }

    deleteCarro(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}