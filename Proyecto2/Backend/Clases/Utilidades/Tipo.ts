export enum Tipo {
    ENTERO,
    DOUBLE,
    CADENA,
    NULL,
}

export type TipoRetorno = {valor: any, tipo: Tipo};