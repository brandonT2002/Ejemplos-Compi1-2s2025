import { Instruccion } from "../Abstractas/Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { tipoInstruccion } from "../Utilidades/TipoInstruccion";

export class Bloque extends Instruccion {
    constructor(linea: number, columna: number, private instrucciones: Instruccion[]) {
        super(linea, columna, tipoInstruccion.BLOQUE)
    }

    public ejecutar(entorno: Entorno) {
        const nuevoEntorno = new Entorno(entorno, entorno.nombre);
        for (const Instruccion of this.instrucciones) {
            try {
                const resultado = Instruccion.ejecutar(nuevoEntorno);
                if (resultado) {
                    return resultado;
                }
            } catch (_) {}
        }
    }
}