package Clases.Automata;

import Clases.Objetos.CuerpoAFD;

public class Automata {
    String nombre;
    public String tipo;
    public CuerpoAFD cuerpo;

    public Automata(String nombre, String tipo, CuerpoAFD cuerpo) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.cuerpo = cuerpo;
    }
}
