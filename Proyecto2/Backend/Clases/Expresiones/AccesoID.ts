import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Entorno/Entorno";
import { Simbolo } from "../Entorno/Simbolo";
import { Tipo } from "../Utilidades/Tipo";
import { TipoExpresion } from "../Utilidades/TipoExpresion";

export class AccesoID extends Expresion {
    constructor(linea: number, columna: number, private id: string) {
        super(linea, columna, TipoExpresion.ACCESO_ID);
    }

    public ejecutar(entorno: Entorno) {
        const valor: Simbolo | null = entorno.getVariable(this.id);
        if (valor) {
            // console.log('Accediendo al ID: ' + this.id + ' con valor: ' + valor.valor + ' y tipo: ' + Tipo[valor.tipo]);
            return {valor: valor.valor, tipo: valor.tipo};
        }
        return {valor: 'NULL', tipo: Tipo.NULL};
    }
}