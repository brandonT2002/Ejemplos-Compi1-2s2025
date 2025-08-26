package Clases.Instrucciones;

import Clases.Abstractas.Instruccion;
import Clases.Entorno.Entorno;
import Clases.Objetos.CuerpoAFD;
import Clases.Utilidades.TipoInstruccion;

public class GuardarAutomata extends Instruccion {
    String nombre;
    String tipo;
    CuerpoAFD cuerpo;

    public GuardarAutomata(String nombre, String tipo, CuerpoAFD cuerpo) {
        super(TipoInstruccion.AFD);
        this.nombre = nombre;
        this.tipo = tipo;
        this.cuerpo = cuerpo;
    }

    public void ejecutar(Entorno entorno) {
        // System.out.println("Guardando Automata: " + nombre);
        entorno.guardarAutomata(nombre.replaceAll("\"", ""), tipo, cuerpo);
    }
}
