package Clases.Entorno;

import java.util.Map;
import java.util.TreeMap;

import Clases.Automata.Automata;
import Clases.Objetos.CuerpoAFD;
import Clases.Objetos.Regla;

public class Entorno {
    String nombre;
    private Map<String, Automata> listaAutomatas = new TreeMap<>();

    public Entorno (String nombre) {
        this.nombre = nombre;
    }

    public void guardarAutomata(String nombre, String tipo, CuerpoAFD cuerpo) {
        listaAutomatas.put(nombre, new Automata(nombre, tipo, cuerpo));
        // System.out.println("Automata guardado: " + nombre);
    }

    public void verAutomatas() {
        if (listaAutomatas.isEmpty()) {
            // System.out.println("No hay automatas en el entorno " + nombre);
            Clases.Utilidades.Salidas.salidaConsola.add("No hay automatas en el entorno " + nombre);
        } else {
            Clases.Utilidades.Salidas.salidaConsola.add("Automatas en el entorno " + nombre + ":");
            for (String key : listaAutomatas.keySet()) {
                Clases.Utilidades.Salidas.salidaConsola.add("- " + key);
            }
        }
    }

    public void descripcion(String nombre) {
        if (listaAutomatas.containsKey(nombre)){
            Automata automata = listaAutomatas.get(nombre);
            Clases.Utilidades.Salidas.salidaConsola.add("Nombre: " + nombre);
            Clases.Utilidades.Salidas.salidaConsola.add("Tipo: " + automata.tipo);
            for (Regla estado : automata.cuerpo.reglas) {
                Clases.Utilidades.Salidas.salidaConsola.add(" " + estado.id + " -> " + estado.elementos.toString());
            }
        }
    }
}
