import { Tipo } from "../Utilidades/Tipo";

export class SimboloTabla {
    public indice: number;
    constructor(private linea: number, private columna: number, private esVariable: boolean, private esPrimitivo: boolean, private tipo: Tipo, private id: string, private nombreEntorno: string) {
        this.indice = 0;
    }

    public hash(): string {
        return `${this.id}_${this.tipo}_${this.nombreEntorno}_${this.linea}_${this.columna}_${this.esVariable}_${this.esPrimitivo}`
    }

    public getTipo(tipo : Tipo): string {
        switch (tipo) {
            case Tipo.ENTERO:
                return "entero";
            case Tipo.DOUBLE:
                return "decimal";
            case Tipo.BOOLEANO:
                return "booleano";
            case Tipo.CARACTER:
                return "caracter";
            case Tipo.CADENA:
                return "cadena";
            case Tipo.NULL:
                return "null";
            default:
                return "desconocido";
        }
    }
}