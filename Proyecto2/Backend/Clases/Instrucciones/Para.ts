import { Expresion } from "../Abstractas/Expresion";
import { Instruccion } from "../Abstractas/Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { tipoInstruccion } from "../Utilidades/TipoInstruccion";
import { Bloque } from "./Bloque";

export class Para extends Instruccion {
    private bloque: Bloque;
    constructor(linea: number, columna: number, public inicio: Instruccion, public condicion: Expresion, public actualizacion: Expresion, public instrucciones: Instruccion[]) { 
        super(linea, columna, tipoInstruccion.PARA);
        this.bloque = new Bloque(linea, columna, instrucciones);
    }

    public ejecutar(entorno: Entorno) {
        const entornoLocal = new Entorno(entorno, entorno.nombre + "_PARA");
        this.inicio.ejecutar(entorno);
        let condicion = this.condicion.ejecutar(entorno);
        while (condicion.valor) {
            this.bloque.ejecutar(entornoLocal);
            this.actualizacion.ejecutar(entorno);
            condicion = this.condicion.ejecutar(entorno);
        }
    }
}