package Clases.Entorno;

import java.util.ArrayList;

import Clases.Automata.Automata;

public class Entorno {
    private ArrayList<Automata> listaAutomatas;

    public Entorno () {
        listaAutomatas = new ArrayList<>();
    }

    public void guardarAutomata(String nombre) {
        listaAutomatas.add(new Automata(nombre));
    }
}
