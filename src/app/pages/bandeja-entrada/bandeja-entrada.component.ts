import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { Table } from 'primeng/table';
import { globalConstants } from 'src/app/common/global-constants';
import { MovimientoTramiteModel } from 'src/app/models/movimiento-tramite.model';
import { OrganismoModel } from 'src/app/models/organismo.model';
import { SectorModel } from 'src/app/models/sector.model';
import { TipoTramiteModel } from 'src/app/models/tipo-tramite.model';
import { MovimientosTramiteService } from 'src/app/service/movimientos-tramite.service';

@Component({
  selector: 'app-bandeja-entrada',
  templateUrl: './bandeja-entrada.component.html',
  styleUrls: ['./bandeja-entrada.component.scss']
})
export class BandejaEntradaComponent implements OnInit {
  submitted: boolean;

  //TEMPORAL
  sector: SectorModel;

  //para mensajes
  msgs: Message[] = [];
 
  //representatives: Representative[];
  statuses: any[];

  activityValues: number[] = [0, 100];
  idFrozen: boolean = false;

  loading:boolean = true;

  expandedRows = {};
  isExpanded: boolean = false;

  @ViewChild('dt') table: Table;

  @ViewChild('filter') filter: ElementRef;

  //CANTIDADES
  cantEnEspera: number = 0;
  cantRecibidos: number = 0;
  cantEnviados: number = 0;

  //LISTAS    
  listSectores: SectorModel[]=[];
  listOrganismos: OrganismoModel[]= [];
  listTiposTramite: TipoTramiteModel[]=[];
  listMovimientosTramite: MovimientoTramiteModel[]=[];

  constructor(
    private movimientosTramiteService: MovimientosTramiteService,
  ) { 
    this.sector = globalConstants.sector;
  }
  //FIN CONSTRUCTOR......................................

  

  ngOnInit(): void {
    if(globalConstants.sector){
      this.listarTramitesBandeja(globalConstants.sector.id_sector);
      this.contarEnEspera(globalConstants.sector.id_sector);
      this.contarRecibidos(globalConstants.sector.id_sector);
      this.contarEnviados(globalConstants.sector.id_sector);
    }
    else{
      this.loading=false;
    }
      
  }

  //LISTADO MOVIMIENTOS DE TRAMITE
  listarTramitesBandeja(id_sector: number){ 
    this.expandedRows={};
    if(id_sector){
      this.movimientosTramiteService.listarTodosDestinadosAMiSector(id_sector).
      subscribe(respuesta => {
        this.listMovimientosTramite= respuesta[0];  
        this.loading = false;        
      //this.expandedRows[tramite.numero_tramite]=true;
      });
    }     
  }
  //FIN LISTADO MOVIMIENTO DE TRAMITE...................................................

  //LISTADO EN ESPERA
  contarEnEspera(id_sector: number){ 
    if(id_sector){
      this.movimientosTramiteService.listarTramitesPendientes(id_sector).
      subscribe(respuesta => {
        this.cantEnEspera= respuesta[1];      
      });
    }     
  }
  //FIN LISTADO EN ESPERA...................................................

  //LISTADO RECIBIDOS
  contarRecibidos(id_sector: number){ 
    if(id_sector){
      this.movimientosTramiteService.listarTramitesRecibidos(id_sector).
      subscribe(respuesta => {
        this.cantRecibidos= respuesta[1];      
      });
    }     
  }
  //FIN LISTADO RECIBIDOS...................................................

  //LISTADO ENVIADOS
  contarEnviados(id_sector: number){ 
    if(id_sector){
      this.movimientosTramiteService.listarTramitesEnviados(id_sector).
      subscribe(respuesta => {
        this.cantEnviados = respuesta[1];      
      });
    }     
  }
  //FIN LISTADO ENVIADOS...................................................

   //VALOR DE NEGRITA O NO
   asignarNegrita(valor: boolean){ 
    if(!valor){
      return "bold";
    }
    else{
      return "normal";
    }
  }
  //FIN LISTADO MOVIMIENTO DE TRAMITE...................................................

  //LIMPIAR
  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  } 
  //FIN LIMPIAR  

}
