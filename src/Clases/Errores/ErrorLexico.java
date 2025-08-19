package Clases.Errores;

public class ErrorLexico {
    private int linea;
    private int columna;
    private String lexema;

    public ErrorLexico(int linea, int columna, String lexema) {
        this.linea = linea;
        this.columna = columna;
        this.lexema = lexema;
    }
    public String toString() {
        return linea + " ".repeat(6 - String.valueOf(linea).length()) + columna + " ".repeat(8 - String.valueOf(columna).length()) + "Caracter no reconocido: " + lexema;
    }
}
