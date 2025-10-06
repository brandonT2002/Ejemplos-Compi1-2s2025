import { Tipo } from "../Utilidades/Tipo";

export class Entorno {
    public ids: Map<string, any> = new Map<string, any>();
    public funciones: Map<string, any> = new Map<string, any>();
    public objetos: Map<string, any> = new Map<string, any>();

    constructor (private anterior: Entorno | null, public nombre: string) {}

    // === Guardar Variables ===
    public guardarVariable(id: string, valor: any, tipo: Tipo, linea: number, columna: number) {
        let entornoActual: Entorno = this;
        if (!entornoActual.ids.has(id)) {
            // Guardar variable
            entornoActual.ids.set(id, {valor: valor, tipo: tipo});
            console.log('Se guardo la variable ' + id + ' en el entorno ' + entornoActual.nombre);
            // Insertar a la tabla de simbolos
        }
        // Error semántico: La variable ya existe
    }
}