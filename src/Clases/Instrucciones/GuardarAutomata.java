package Clases.Instrucciones;

import Clases.Abstractas.Instruccion;
import Clases.Entorno.Entorno;
import Clases.Utilidades.TipoInstruccion;

public class GuardarAutomata extends Instruccion {
    String nombre;

    public GuardarAutomata(String nombre) {
        super(TipoInstruccion.AFD);
        this.nombre = nombre;
    }

    public void ejecutar(Entorno entorno) {
        System.out.println("Guardando Automata: " + nombre);
    }
}
