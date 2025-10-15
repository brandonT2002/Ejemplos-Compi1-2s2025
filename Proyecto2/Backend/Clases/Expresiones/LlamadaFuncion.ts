import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Entorno/Entorno";
import { Bloque } from "../Instrucciones/Bloque";
import { TipoRetorno } from "../Utilidades/Tipo";
import { TipoExpresion } from "../Utilidades/TipoExpresion";

export class LlamadaFuncion extends Expresion {
    constructor(linea: number, columna: number, public idFuncion: string, public argumentos: Expresion[] | null) {
        super(linea, columna, TipoExpresion.LLAMADA_FUNCION);
    }

    public ejecutar(entorno: Entorno): TipoRetorno | any {
        const funcion = entorno.getFuncion(this.idFuncion);
        if (funcion) {
            // validar arugmentos
            let bloque: any = new Bloque(this.linea, this.columna, funcion.instrucciones).ejecutar(entorno);
            if (bloque) {
                if (bloque.valor === TipoExpresion.RETORNO) {
                    return
                }
                return bloque;
            }
        }
        return null;
    }
}