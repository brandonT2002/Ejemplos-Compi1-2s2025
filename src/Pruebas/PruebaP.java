package Pruebas;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.StringReader;

import Clases.Abstractas.Instruccion;
import Clases.Entorno.Entorno;
import Lenguaje.Parser;
import Lenguaje.Scanner;

public class PruebaP {
    public static void main(String[] args) throws Exception {
        try {
            String input = readInput("./inputs/Prueba.txt");
            Scanner scanner = new Scanner(
                new BufferedReader(
                    new StringReader(input)
                )
            );
            Parser parser = new Parser(scanner);
            parser.parse();
            Entorno global = new Entorno("global");
            String salida_ = "";
            for (Instruccion instruccion : parser.instrucciones) {
                try {
                    instruccion.ejecutar(global);
                    for (String salida : Clases.Utilidades.Salidas.salidaConsola) {
                        salida_ += salida + "\n";
                    }
                    Clases.Utilidades.Salidas.salidaConsola.clear();
                } catch (Exception e) {
                    System.out.println(e);
                }
            }
            System.out.println(salida_);
            System.out.println("Errores Sintácticos:");
            for (int i = 0; i < parser.erroresSintacticos.size(); i++) {
                System.out.println(parser.erroresSintacticos.get(i));
            }
        }
        catch(Exception e) {
            System.out.println(e);
        }
    }
    public static String readInput(String path) {
        try {
            File archivo = new File(path);
            FileInputStream fis = new FileInputStream(archivo);
            InputStreamReader isr = new InputStreamReader(fis,"UTF-8");
            BufferedReader br = new BufferedReader(isr);
            String texto = "";
            String linea;
            while ((linea = br.readLine()) != null) {
                texto += linea + "\n";
            }
            br.close();
            fis.close();
            return texto;
        }
        catch(Exception e) {
            System.out.println(e);
        }
        return "";
    }
}