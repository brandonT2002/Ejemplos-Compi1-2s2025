export enum Tipo {
    ENTERO,
    DOUBLE,
    BOOLEANO,
    CARACTER,
    CADENA,
    NULL,
}

export type TipoRetorno = {valor: any, tipo: Tipo};