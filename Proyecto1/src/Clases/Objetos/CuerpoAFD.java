package Clases.Objetos;

import java.util.ArrayList;

public class CuerpoAFD {
    public ArrayList<Regla> reglas;
    public ArrayList<Transicion> transiciones;

    public CuerpoAFD(ArrayList<Regla> reglas, ArrayList<Transicion> transiciones) {
        this.reglas = reglas;
        this.transiciones = transiciones;
    }
}
