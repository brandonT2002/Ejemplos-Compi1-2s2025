package Clases.Abstractas;

import Clases.Entorno.Entorno;
import Clases.Utilidades.TipoInstruccion;

public abstract class Instruccion {
    TipoInstruccion tipoInstruccion;
    public Instruccion(TipoInstruccion tipoInstruccion) {
        this.tipoInstruccion = tipoInstruccion;
    }

    public abstract void ejecutar(Entorno entorno);
}
