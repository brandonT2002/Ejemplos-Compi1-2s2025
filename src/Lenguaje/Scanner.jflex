// === 1. PACKAGE E IMPORTS ===
package Lenguaje;
import java_cup.runtime.Symbol;
import java.util.ArrayList;
import Clases.Errores.ErrorLexico;

%%

// === 2. CONFIGURACIONES PARA EL ANALISIS ===
%{
    // Código Java
    // Crear listas
    ArrayList<ErrorLexico> listaErrores = new ArrayList<>();

    public void agregarError(int linea, int columna, String lexema) {
        listaErrores.add(new ErrorLexico(linea, columna, lexema));
    }
    public ArrayList<ErrorLexico> getListaErrores() {
        return listaErrores;
    }
%}

// === DIRECTIVAS
// %Directiva
%class Scanner
%public
%cupsym Terminal
%cup
%char
%column
%full
%line
%unicode

// === CONSTRUCTOR
%init{
    yyline = 1;
    yychar = 1;
%init}

// === EXPRESIONES REGULARES
UNUSED = [ \r\t]+ // Caracteres que se omiten
NUMEROS = [0-9]+(\.[0-9]+)?
ID = (\_)*[a-zA-Z][a-zA-Z0-9\_]*
CONTENT = ([^\n\"\\]|\\.)
STRING = \"({CONTENT}*)\"
COMMENTS = "//"([^\r\n]*)?
COMMENTM = [/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]
%%

// === 3. REGLAS SEMÁNTICAS
// {ER} { return new Symbol(parametros); }
// id
// numeros
// =
// cadenas (incluyen comillas dobles)
// llaves
// -> (transicion)
// ; (punto y coma)
{UNUSED}                     {}
{NUMEROS}                    {return new Symbol(Terminal.TK_numero,      yyline, yychar, yytext());}
// Palabras reservadas
"AFD"                        {return new Symbol(Terminal.TK_afd,      yyline, yychar, yytext());}
"Nombre"                     {return new Symbol(Terminal.TK_nombre,   yyline, yychar, yytext());}
"Transiciones"               {return new Symbol(Terminal.TK_transicion, yyline, yychar, yytext());}
"verAutomatas"               {return new Symbol(Terminal.TK_verAutomatas, yyline, yychar, yytext());}
"desc"                       {return new Symbol(Terminal.TK_desc, yyline, yychar, yytext());}
{ID}                         {return new Symbol(Terminal.TK_id,         yyline, yychar, yytext());}
{STRING}                     {return new Symbol(Terminal.TK_cadena,    yyline, yychar, yytext());}
"="                          {return new Symbol(Terminal.TK_asignacion, yyline, yychar, yytext());}
"{"                          {return new Symbol(Terminal.TK_llave_izquierda, yyline, yychar, yytext());}
"}"                          {return new Symbol(Terminal.TK_llave_derecha, yyline, yychar, yytext());}
"("                          {return new Symbol(Terminal.TK_parentesis_izquierdo, yyline, yychar, yytext());}
")"                          {return new Symbol(Terminal.TK_parentesis_derecho, yyline, yychar, yytext());}
"->"                         {return new Symbol(Terminal.TK_flecha, yyline, yychar, yytext());}
";"                          {return new Symbol(Terminal.TK_punto_y_coma, yyline, yychar, yytext());}
"<"                          {return new Symbol(Terminal.TK_menor_que, yyline, yychar, yytext());}
">"                          {return new Symbol(Terminal.TK_mayor_que, yyline, yychar, yytext());}
","                          {return new Symbol(Terminal.TK_coma, yyline, yychar, yytext());}
"|"                          {return new Symbol(Terminal.TK_pipe, yyline, yychar, yytext());}
":"                          {return new Symbol(Terminal.TK_dos_puntos, yyline, yychar, yytext());}
"/"                          {return new Symbol(Terminal.TK_division, yyline, yychar, yytext());}
{COMMENTS}                   {}
{COMMENTM}                   {}
\n                           {yychar = 1;}
.                            {agregarError(yyline, yychar, yytext());}