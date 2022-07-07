import { UsuarioModel } from '../models/usuario.model';


export class globalConstants {
    public static urlImagen: string = "";
    public static validado: boolean = false;
    public static usuario: UsuarioModel;
    public static nombreUsuario: string = "";
    public static inicialesUsuario: string = "";
    public static emailUsuario: string = "";
    public static sector_usuario: number;
    public static organismo_usuario: number=9;
    public static sector_corto: string;
    public static sector_largo: string;
    public static rol_usuario: string;
    public static id_usuario: number;
    
}