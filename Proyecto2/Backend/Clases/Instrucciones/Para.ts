import { Expresion } from "../Abstractas/Expresion";
import { Instruccion } from "../Abstractas/Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { tipoInstruccion } from "../Utilidades/TipoInstruccion";
import { Bloque } from "./Bloque";

export class Para extends Instruccion {
    constructor(linea: number, columna: number, public inicio: Expresion, public condicion: Expresion, public incremento: Expresion, public instrucciones: Instruccion[]) { 
        super(linea, columna, tipoInstruccion.PARA);
    }

    public ejecutar(entorno: Entorno) {
        let entornoLocal = new Entorno(entorno, entorno.nombre + "_PARA");
        let inicio = this.inicio.ejecutar(entorno);
        if (inicio) {
            let condicion = this.condicion.ejecutar(entorno);
            if (condicion) {
                let bloque = new Bloque(this.linea, this.columna, this.instrucciones);
                if (bloque) {
                    bloque.ejecutar(entornoLocal);
                    this.incremento.ejecutar(entorno);
                }
            }
        }
    }
}