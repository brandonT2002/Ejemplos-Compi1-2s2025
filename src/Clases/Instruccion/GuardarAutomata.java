package Clases.Instruccion;

import Clases.Entorno.Entorno;

public abstract class GuardarAutomata {
    String nombre; 

    public GuardarAutomata(String nombre) {
        // super(tipoInstruccion);
        this.nombre = nombre;
    }

    // public void ejecutar(Entorno entorno) {
    //     entorno.guardarAutomata(nombre);
    // }
}
