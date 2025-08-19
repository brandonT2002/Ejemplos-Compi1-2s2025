package Clases.Instruccion;

import Clases.Entorno.Entorno;

public abstract class Instruccion {
    public String tipoInstruccion;

    public Instruccion(String tipoInstruccion) {
        this.tipoInstruccion = tipoInstruccion;
    }

    public abstract void ejecutar(Entorno entorno);
}
