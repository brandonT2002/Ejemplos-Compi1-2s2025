package Clases.Instrucciones;

import Clases.Abstractas.Instruccion;
import Clases.Entorno.Entorno;
import Clases.Utilidades.TipoInstruccion;

public class verAutomatas extends Instruccion {
    public verAutomatas() {
        super(TipoInstruccion.FUNCION);
    }

    public void ejecutar(Entorno entorno) {
        entorno.verAutomatas();
    }
}
