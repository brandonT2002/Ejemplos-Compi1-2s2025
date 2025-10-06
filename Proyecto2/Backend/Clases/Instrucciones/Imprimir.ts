import { Expresion } from "../Abstractas/Expresion";
import { Instruccion } from "../Abstractas/Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { tipoInstruccion } from "../Utilidades/TipoInstruccion";

export class Imprimir extends Instruccion{
    constructor(linea: number, columna: number, private expresion: Expresion) {
        super(linea, columna, tipoInstruccion.IMPRIMIR)
    }

    public ejecutar(entorno: Entorno) {
        let valor = this.expresion.ejecutar(entorno);
        entorno.setPrint(valor.valor);
    }
}