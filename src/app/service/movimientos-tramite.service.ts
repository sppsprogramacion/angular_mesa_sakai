import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MovimientoTramiteModel } from '../models/movimiento-tramite.model';

const base_url = environment.URL_BASE

@Injectable({
  providedIn: 'root'
})
export class MovimientosTramiteService {
  movimiento_tramite: MovimientoTramiteModel = new MovimientoTramiteModel;
  constructor(
    private readonly http: HttpClient
  ) { }

  listarMovimientosTramite(){
    return this.http.get<MovimientoTramiteModel[]>(`${base_url}/movimientos-tramite`)
  }

  guardarMovimientoTramite(data: any){    
    this.movimiento_tramite={...data};
    return this.http.post(`${base_url}/movimientos-tramite`, this.movimiento_tramite);
  }
}
