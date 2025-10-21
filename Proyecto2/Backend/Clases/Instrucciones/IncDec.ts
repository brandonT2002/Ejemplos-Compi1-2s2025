import { Instruccion } from "../Abstractas/Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { tipoInstruccion } from "../Utilidades/TipoInstruccion";

export class IncDec extends Instruccion {
    constructor(linea: number, columna: number, public id: string, public operador: string) { 
        super(linea, columna, tipoInstruccion.INCREMENTO);
    }

    public ejecutar(entorno: Entorno) {
        let simbolo = entorno.getVariable(this.id);
        // console.log("ID: " + this.id);
        // console.log("Operador: " + this.operador);
        if (simbolo) {
            let valor: number;
            switch (this.operador) {
                case '++':
                    valor = simbolo.valor + 1;
                    entorno.modificarVariable(this.id, valor);
                    return {valor: valor, tipo: simbolo.tipo};
                case '--':
                    valor = simbolo.valor - 1;
                    entorno.modificarVariable(this.id, valor);
                    return {valor: valor, tipo: simbolo.tipo};
                case '--':
                    return;
                default:
                    // Error: operador no reconocido
            }
        }

    }
}