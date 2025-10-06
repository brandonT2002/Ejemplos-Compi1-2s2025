import { Expresion } from "../Abstractas/Expresion";
import { Instruccion } from "../Abstractas/Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { Error } from "../Utilidades/Error";
import { errores } from "../Utilidades/Salida";
import { Tipo, TipoRetorno } from "../Utilidades/Tipo";
import { TipoError } from "../Utilidades/TipoError";
import { tipoInstruccion } from "../Utilidades/TipoInstruccion";

export class DeclaracionID extends Instruccion{
    constructor (linea: number, columna: number, private id: string, private tipo: Tipo, private valor: Expresion | null) {
        super(linea, columna, tipoInstruccion.DECLARACION_VARIABLE);
    }

    public ejecutar(entorno: Entorno): any {
        if (typeof this.id === 'string' && typeof this.tipo === 'number' && this.valor) {
            const valor: TipoRetorno = this.valor.ejecutar(entorno);
            if (valor.tipo === this.tipo) {
                entorno.guardarVariable(this.id, valor.valor, this.tipo, this.linea, this.columna);
            } else {
                // Error semántico: Los tipos de datos no coinciden
                errores.push(new Error(this.linea, this.columna, TipoError.SEMANTICO, `Los tipos de datos no coinciden, se esperaba ${Tipo[this.tipo]} y se obtuvo ${Tipo[valor.tipo]}`));
            }
        }
    }
}