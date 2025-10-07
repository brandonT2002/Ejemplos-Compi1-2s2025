import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Entorno/Entorno";
import { suma } from "../Utilidades/OperacionesDominante";
import { Tipo, TipoRetorno } from "../Utilidades/Tipo";
import { TipoExpresion } from "../Utilidades/TipoExpresion";

export class Aritmetico extends Expresion {
    private tipo: Tipo = Tipo.NULL;

    constructor (linea: number, columna: number, public exp1: Expresion, public signo: string, public exp2: Expresion) {
        super(linea, columna, TipoExpresion.ARITMETICO);
    }

    public ejecutar(entorno: Entorno): TipoRetorno {
        switch (this.signo) {
            case "+":
                return this.sumar(entorno);
            case "-":
                return this.restar(entorno);
            case "*":
                // return this.multiplicar(entorno);
            case "/":
                // return this.dividir(entorno);
            default:
                throw new Error(`Operador ${this.signo} no soportado`);
        }
    }

    private sumar(entorno: Entorno): TipoRetorno {
        const valor1 = this.exp1.ejecutar(entorno);
        const valor2 = this.exp2.ejecutar(entorno);
        this.tipo = suma[valor1.tipo][valor2.tipo];
        if (this.tipo !== Tipo.NULL) {
            if (this.tipo === Tipo.ENTERO) {
                return {valor: Number(valor1.valor) + Number(valor2.valor), tipo: this.tipo};
            } else if (this.tipo === Tipo.DOUBLE) {
                return {valor: parseFloat(valor1.valor) + parseFloat(valor2.valor), tipo: this.tipo};
            } else if (this.tipo === Tipo.CADENA) {
                return {valor: valor1.valor.toString() + valor2.valor.toString(), tipo: this.tipo};
            }
        }
        return {valor: 'NULL', tipo: Tipo.NULL};
    }

    private restar(entorno: Entorno): TipoRetorno {
        const valor1 = this.exp1.ejecutar(entorno);
        const valor2 = this.exp2.ejecutar(entorno);
        this.tipo = suma[valor1.tipo][valor2.tipo];
        if (this.tipo !== Tipo.NULL) {
            if (this.tipo === Tipo.ENTERO) {
                return {valor: Number(valor1.valor) - Number(valor2.valor), tipo: this.tipo};
            } else if (this.tipo === Tipo.DOUBLE) {
                return {valor: parseFloat(valor1.valor) - parseFloat(valor2.valor), tipo: this.tipo};
            }
        }
        return {valor: 'NULL', tipo: Tipo.NULL};
    }
}