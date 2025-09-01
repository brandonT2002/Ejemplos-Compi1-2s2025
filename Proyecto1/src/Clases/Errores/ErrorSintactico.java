package Clases.Errores;

public class ErrorSintactico {
    int linea;
    int columna;
    Object token;
    String tipo;

    String error;
    public ErrorSintactico(int linea, int columna, Object token, String tipo) {
        this.linea = linea;
        this.columna = columna;
        this.token = token;
        this.tipo = tipo;
    }

    public ErrorSintactico(String error) {
        this.error = error;
    }

    public String toString() {
        if (error != null) {
            return error;
        }
        return "Error Sintactico en la linea " + linea + " columna " + columna + "no se esperaba " + tipo + " " + token;
    }
}
