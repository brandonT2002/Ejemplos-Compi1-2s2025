import { Expresion } from "../Abstractas/Expresion";
import { Instruccion } from "../Abstractas/Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { tipoInstruccion } from "../Utilidades/TipoInstruccion";

export class Reasignacion extends Instruccion {
    constructor(linea: number, columna: number, private id: string, private valor: Expresion){
        super(linea, columna, tipoInstruccion.REASIGNACION);
    }

    public ejecutar(entorno: Entorno) {
        let nuevoValor = this.valor.ejecutar(entorno);
        entorno.modificarVariable(this.id, nuevoValor.valor);
    }
}