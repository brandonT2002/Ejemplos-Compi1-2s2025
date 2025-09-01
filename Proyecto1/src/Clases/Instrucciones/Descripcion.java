package Clases.Instrucciones;

import Clases.Abstractas.Instruccion;
import Clases.Entorno.Entorno;
import Clases.Utilidades.TipoInstruccion;

public class Descripcion extends Instruccion {
    private String nombre;

    public Descripcion(String nombre) {
        super(TipoInstruccion.FUNCION);
        this.nombre = nombre;
    }

    public void ejecutar(Entorno entorno) {
        entorno.descripcion(nombre);
    }
}
