// Analizador léxico
%{
    // Javascript
%}

%lex

// Expresiones regulares
UNUSED      [\s\r\t]+
INTEGER     [0-9]+\b
DOUBLE      [0-9]+\.[0-9]+\b
CONTENT     ([^\n\"\\]|\\.)
ID          [a-zA-Z_][a-zA-Z0-9_]*
STRING      \"({CONTENT}*)\"

%%

// Reglas semanticas
\n                      {}
{UNUSED}                {}
// Reservadas
"entero"                { return 'TK_entero'  }
"double"                { return 'TK_double'  }
"imprimir"              { return 'TK_imprimir' }
"if"                    { return 'TK_if'      }
"else"                  { return 'TK_else'    }
// Valores
{ID}                    { return 'TK_id'     }
{STRING}                { return 'TK_string' }
{DOUBLE}                { return 'TK_double' }
{INTEGER}               { return 'TK_int'    }
// Símbolos
'+'                     { return 'TK_mas'    }
'-'                     { return 'TK_menos'  }
'*'                     { return 'TK_multiplicacion'  }
'/'                     { return 'TK_division'  }
'=='                    { return 'TK_igualdad' }
'='                     { return 'TK_asignacion' }
'>='                    { return 'TK_mayorIgual' }
'<='                    { return 'TK_menorIgual' }
'>'                     { return 'TK_mayor' }
'<'                     { return 'TK_menor' }
'&&'                    { return 'TK_and' }
'||'                    { return 'TK_or' }
'!'                     { return 'TK_not' }
'('                     { return 'TK_parAbre' }
')'                     { return 'TK_parCierra' }
'{'                     { return 'TK_llaveAbre' }
'}'                     { return 'TK_llaveCierra' }
';'                     { return 'TK_puntoComa' }
<<EOF>>                 { return 'EOF' }
/lex
// Analizador sintáctico

%{
    // Javascript
%}

// Precedencia de operadores
%left 'TK_or'
%left 'TK_and'
%right 'TK_not'
%left 'TK_igualdad', 'TK_mayorIgual', 'TK_menorIgual', 'TK_mayor', 'TK_menor'
%left 'TK_mas', 'TK_menos'
%left 'TK_multiplicacion', 'TK_division'

// %right TK_negacionUnaria

// Gramatica
%start INICIO
%%

INICIO : INSTRUCCIONES EOF {return $1} |
        EOF                {return []} ;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION |
                INSTRUCCION               ;

INSTRUCCION :
            DECLARACION_VAR |
            CONDICIONAL_IF  |
            IMPRIMIR ;

DECLARACION_VAR :
            TK_entero TK_id TK_asignacion EXPRESION TK_puntoComa ;

IMPRIMIR :
            TK_imprimir TK_parAbre EXPRESION TK_parCierra TK_puntoComa ;

CONDICIONAL_IF :
            TK_if TK_parAbre EXPRESION TK_parCierra TK_llaveAbre INSTRUCCIONES TK_llaveCierra TK_else CONDICIONAL_IF |
            TK_if TK_parAbre EXPRESION TK_parCierra TK_llaveAbre INSTRUCCIONES TK_llaveCierra TK_else TK_llaveAbre INSTRUCCIONES TK_llaveCierra |
            TK_if TK_parAbre EXPRESION TK_parCierra TK_llaveAbre INSTRUCCIONES TK_llaveCierra ;

EXPRESION : 
            ARITMETICAS {$$ = $1}        |
            RELACIONALES {$$ = $1}       |
            LOGICAS {$$ = $1}            |
            TK_parAbre EXPRESION TK_parCierra {$$ = $2} |
            TK_int  {$$ = Number($1)}   |
            TK_double {$$ = Number($1)} |
            TK_id {$$ = $1}             |
            TK_string {$$ = $1}         ;

ARITMETICAS : 
            EXPRESION TK_mas EXPRESION {$$ = $1 + $3} |
            EXPRESION TK_menos EXPRESION {$$ = $1 - $3} |
            EXPRESION TK_multiplicacion EXPRESION {$$ = $1 * $3} |
            EXPRESION TK_division EXPRESION {$$ = $1 / $3};
            // TK_menos EXPRESION %prec TK_negacionUnaria {$$ = Number($2)} ;

RELACIONALES :
            EXPRESION TK_igualdad EXPRESION {$$ = $1 == $3} |
            EXPRESION TK_mayor EXPRESION {$$ = $1 > $3} |
            EXPRESION TK_menor EXPRESION {$$ = $1 < $3} |
            EXPRESION TK_mayorIgual EXPRESION {$$ = $1 >= $3} |
            EXPRESION TK_menorIgual EXPRESION {$$ = $1 <= $3} ;

LOGICAS :
            EXPRESION TK_and EXPRESION {$$ = $1 && $3} |
            EXPRESION TK_or EXPRESION {$$ = $1 || $3} |
            TK_not EXPRESION {$$ = !$2} ;