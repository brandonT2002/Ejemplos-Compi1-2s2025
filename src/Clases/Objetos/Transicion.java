package Clases.Objetos;

import java.util.Map;
import java.util.TreeMap;

public class Transicion {
    public String estadoOrigen;
    private Map<String, String> transiciones = new TreeMap<>();

    public Transicion(String estadoOrigen) {
        this.estadoOrigen = estadoOrigen;
    }

    public void agregarTransicion(String simbolo, String estadoDestino) {
        transiciones.put(simbolo, estadoDestino);
    }

    public String getEstadoOrigen() {
        return estadoOrigen;
    }

    public Map<String, String> getTransiciones() {
        return transiciones;
    }

}
