import { Tipo } from "./Tipo";

export const suma:Tipo[][] = [
    [Tipo.ENTERO, Tipo.DOUBLE, Tipo.ENTERO, Tipo.ENTERO, Tipo.CADENA],
    [Tipo.DOUBLE, Tipo.DOUBLE, Tipo.DOUBLE, Tipo.DOUBLE, Tipo.CADENA],
    [Tipo.ENTERO, Tipo.DOUBLE, Tipo.NULL, Tipo.NULL, Tipo.CADENA],
    [Tipo.ENTERO, Tipo.DOUBLE, Tipo.NULL, Tipo.CADENA, Tipo.CADENA],
    [Tipo.CADENA, Tipo.CADENA, Tipo.CADENA, Tipo.CADENA, Tipo.CADENA],
];

export const resta: Tipo[][] = [
    [Tipo.ENTERO,  Tipo.DOUBLE, Tipo.ENTERO, Tipo.ENTERO, Tipo.NULL],
    [Tipo.DOUBLE, Tipo.DOUBLE, Tipo.DOUBLE,Tipo.DOUBLE,Tipo.NULL],
    [Tipo.ENTERO,  Tipo.DOUBLE, Tipo.NULL,   Tipo.NULL,   Tipo.NULL],
    [Tipo.ENTERO,  Tipo.DOUBLE, Tipo.NULL,   Tipo.NULL, Tipo.NULL],
    [Tipo.NULL,  Tipo.NULL,  Tipo.NULL, Tipo.NULL, Tipo.NULL],
]

export const multiplicacion: Tipo[][] = [
    [Tipo.ENTERO,  Tipo.DOUBLE, Tipo.ENTERO ],
    [Tipo.DOUBLE, Tipo.DOUBLE, Tipo.DOUBLE],
    [Tipo.ENTERO,  Tipo.DOUBLE, Tipo.NULL   ],
]

export const division: Tipo[][] = [
    [Tipo.DOUBLE, Tipo.DOUBLE, Tipo.DOUBLE],
    [Tipo.DOUBLE, Tipo.DOUBLE, Tipo.DOUBLE],
    [Tipo.DOUBLE, Tipo.DOUBLE, Tipo.NULL   ],
]

export const potencia: Tipo[][] = [
    [Tipo.ENTERO,  Tipo.DOUBLE ],
    [Tipo.DOUBLE, Tipo.DOUBLE],
]