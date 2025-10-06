import { tipoInstruccion } from "../Utilidades/TipoInstruccion";

export abstract class Instruccion {
    constructor(public linea: number, public columna: number, public tipoInstruccion: tipoInstruccion) {}
    public abstract ejecutar(entorno: any): any;    
}