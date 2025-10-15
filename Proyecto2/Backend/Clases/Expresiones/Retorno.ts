import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Entorno/Entorno";
import { Tipo, TipoRetorno } from "../Utilidades/Tipo";
import { TipoExpresion } from "../Utilidades/TipoExpresion";

export class Retorno extends Expresion {
    constructor(linea: number, columna: number, public expresion: Expresion | null) {
        super(linea, columna, TipoExpresion.RETORNO);
    }

    public ejecutar(entorno: Entorno): TipoRetorno {
        if (this.expresion) {
            const valor = this.expresion.ejecutar(entorno);
            return { valor: valor.valor, tipo: valor.tipo};
        }
        return { valor: null, tipo: Tipo.NULL };
    }
}