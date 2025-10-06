import { Entorno } from "../Entorno/Entorno";
import { TipoRetorno } from "../Utilidades/Tipo";
import { TipoExpresion } from "../Utilidades/TipoExpresion";

export abstract class Expresion {
    constructor(public linea: number, public columna: number, public tipoExpresion: TipoExpresion) {}
    public abstract ejecutar(entorno: Entorno): TipoRetorno;
}