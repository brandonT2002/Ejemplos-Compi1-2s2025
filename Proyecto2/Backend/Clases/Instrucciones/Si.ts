import { Expresion } from "../Abstractas/Expresion";
import { Instruccion } from "../Abstractas/Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { tipoInstruccion } from "../Utilidades/TipoInstruccion";
import { Bloque } from "./Bloque";

export class Si extends Instruccion {
    private bloque: Bloque;
    // private bloqueElse: Bloque;
    constructor(linea: number, columna: number, private condicion: Expresion, private instrucciones: Instruccion[]) {
        super(linea, columna, tipoInstruccion.SI);
        this.bloque = new Bloque(linea, columna, instrucciones);
    }

    public ejecutar(entorno: Entorno) {
        let condicion = this.condicion.ejecutar(entorno);
        const entornoLocal = new Entorno(entorno, entorno.nombre + "_SI")
        if (condicion.valor) { // si ( condicion verdadera )
            let bloque = this.bloque.ejecutar(entornoLocal);
            if (bloque) {
                return bloque;
            }
            return;
        }
    }
}