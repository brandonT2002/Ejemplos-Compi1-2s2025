import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Entorno/Entorno";
import { Tipo, TipoRetorno } from "../Utilidades/Tipo";
import { TipoExpresion } from "../Utilidades/TipoExpresion";

export class Relacional extends Expresion {
    private tipo: Tipo = Tipo.BOOLEANO;

    constructor (linea: number, columna: number, public exp1: Expresion, public signo: string, public exp2: Expresion) {
        super(linea, columna, TipoExpresion.RELACIONAL);
    }

    public ejecutar(entorno: Entorno): TipoRetorno {
        switch (this.signo) {
            case "==":
                return this.igualdad(entorno);
            case ">":
                return this.mayor(entorno);
            case "<":
                // return this.multiplicar(entorno);
            default:
                throw new Error(`Operador ${this.signo} no soportado`);
        }
    }

    private igualdad(entorno: Entorno): TipoRetorno {
        const valor1 = this.exp1.ejecutar(entorno);
        const valor2 = this.exp2.ejecutar(entorno);
        this.tipo = Tipo.BOOLEANO;
        if (valor1.tipo === Tipo.ENTERO || valor1.tipo === Tipo.DOUBLE || valor1.tipo === Tipo.CARACTER) {
            if (valor2.tipo === Tipo.ENTERO || valor2.tipo === Tipo.DOUBLE || valor2.tipo === Tipo.CARACTER) {
                // 12 == '12'  true
                // 12 === '12'  false
                return {valor: valor1.valor === valor2.valor, tipo: this.tipo};
            }
            // Error semántico: tipos incompatibles
        }
        if (valor1.tipo === Tipo.CADENA && valor2.tipo === Tipo.CADENA) {
            return {valor: valor1.valor === valor2.valor, tipo: this.tipo};
        }
        return {valor: 'NULL', tipo: Tipo.NULL};
    }

    private mayor(entorno: Entorno): TipoRetorno {
        const valor1 = this.exp1.ejecutar(entorno);
        const valor2 = this.exp2.ejecutar(entorno);
        return {valor: valor1.valor > valor2.valor, tipo: this.tipo}
    }
}