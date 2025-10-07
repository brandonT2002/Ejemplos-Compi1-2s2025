import { salidasConsola } from "../Utilidades/Salida";
import { Tipo } from "../Utilidades/Tipo";
import { Simbolo } from "./Simbolo";

export class Entorno {
    public ids: Map<string, Simbolo> = new Map<string, Simbolo>();
    public funciones: Map<string, any> = new Map<string, any>();
    public objetos: Map<string, any> = new Map<string, any>();

    constructor (private anterior: Entorno | null, public nombre: string) {}

    // === Guardar Variables ===
    public guardarVariable(id: string, valor: any, tipo: Tipo, linea: number, columna: number) {
        let entornoActual: Entorno = this;
        if (!entornoActual.ids.has(id)) {
            // Guardar variable
            entornoActual.ids.set(id, new Simbolo(valor, id, tipo));
            console.log('Se guardo la variable ' + id + ' en el entorno ' + entornoActual.nombre);
            // Insertar a la tabla de simbolos
        }
        // Error semántico: La variable ya existe
    }

    // === Obtener Variables ===
    public getVariable(id: string): Simbolo | null {
        let entorno: Entorno | null = this;
        while (entorno != null) {
            if (entorno.ids.has(id)) {
                return entorno.ids.get(id)!
            }
            entorno = entorno.anterior;
        }
        // Error semántico: La variable no existe
        return null;
    }

    // === Modificar Variables ===
    public modificarVariable(id: string, valor: any) {
        let entorno: Entorno | null = this;
        while (entorno != null) {
            if (entorno.ids.has(id)) {
                entorno.ids.get(id)!.valor = valor;
            }
            entorno = entorno.anterior;
        }
    }

    public setPrint(print: string) {
        salidasConsola.push(print);
    }
}