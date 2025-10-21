import { Expresion } from "../Abstractas/Expresion";
import { Instruccion } from "../Abstractas/Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { tipoInstruccion } from "../Utilidades/TipoInstruccion";
import { Bloque } from "./Bloque";

export class Para extends Instruccion {
    private bloque: Bloque;
    constructor(linea: number, columna: number, public inicio: Expresion, public condicion: Expresion, public incremento: Expresion, public instrucciones: Instruccion[]) { 
        super(linea, columna, tipoInstruccion.PARA);
        this.bloque = new Bloque(linea, columna, instrucciones);
    }

    public ejecutar(entorno: Entorno) {
        console.log("-> ENTRO AL PARA");
        const entornoLocal = new Entorno(entorno, entorno.nombre + "_PARA");
        let condicion = this.condicion.ejecutar(entorno);
        console.log("Valor condicion PARA: " + condicion.valor);
        if (condicion.valor) {
            console.log("ENTRO AL PARA");
        }
    }
}