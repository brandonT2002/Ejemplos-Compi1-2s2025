import { Instruccion } from "../Abstractas/Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { Tipo } from "../Utilidades/Tipo";
import { tipoInstruccion } from "../Utilidades/TipoInstruccion";

export class Funcion extends Instruccion{
    constructor (linea: number, columna: number, public nombreFuncion:string, public tipo: Tipo, public instrucciones: Instruccion[]) {
        super(linea, columna, tipoInstruccion.FUNCION);
    }

    public ejecutar(entorno: Entorno) {
        entorno.guardarFuncion(this.nombreFuncion, this);
    }
}