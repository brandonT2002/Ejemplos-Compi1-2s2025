// Analizador léxico
%{
    // Javascript
    let { errores } = require ('../Clases/Utilidades/Salida');
    const { Error } = require('../Clases/Utilidades/Error');
    const { TipoError } = require('../Clases/Utilidades/TipoError');
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
"cadena"                { return 'TK_cadena'  }
"con"                   { return 'TK_con'     }
"valor"                 { return 'TK_valor'   }
"imprimir"              { return 'TK_imprimir'}
"si"                    { return 'TK_if'      }
"o"                     { return 'TK_else'    }
"para"                  { return 'TK_para'    }
"funcion"               { return 'TK_funcion'}
"retornar"               { return 'TK_retornar'}
"ejecutar"               { return 'TK_ejecutar'}
// Valores
{ID}                    { return 'TK_id'     }
{STRING}                { yytext = yytext.slice(1, yyleng - 1); return 'TK_string' }
{DOUBLE}                { return 'TK_decimal' }
{INTEGER}               { return 'TK_int'    }
// Símbolos
'+'                     { return 'TK_mas'             }
'-'                     { return 'TK_menos'           }
'*'                     { return 'TK_multiplicacion'  }
'/'                     { return 'TK_division'        }
'=='                    { return 'TK_igualdad'        }
'='                     { return 'TK_asignacion'      }
'>='                    { return 'TK_mayorIgual'      }
'<='                    { return 'TK_menorIgual'      }
'>'                     { return 'TK_mayor'           }
'<'                     { return 'TK_menor'           }
'&&'                    { return 'TK_and'             }
'||'                    { return 'TK_or'              }
'!'                     { return 'TK_not'             }
'('                     { return 'TK_parAbre'         }
')'                     { return 'TK_parCierra'       }
'{'                     { return 'TK_llaveAbre'       }
'}'                     { return 'TK_llaveCierra'     }
';'                     { return 'TK_puntoComa'       }
.                       { errores.push(new Error(yylloc.first_line, yylloc.first_column + 1, TipoError.LEXICO, `Caracter no reconocido «${yytext}»`)) }
<<EOF>>                 { return 'EOF' }
/lex
// Analizador sintáctico

%{
    // Javascript
    // Tipos
    const { Tipo } = require('../Clases/Utilidades/Tipo');
    // Expresiones
    const { Primitivo } = require('../Clases/Expresiones/Primitivo');
    const { AccesoID } = require('../Clases/Expresiones/AccesoID');
    const { Aritmetico } = require('../Clases/Expresiones/Aritmetico');
    const { Relacional } = require('../Clases/Expresiones/Relacional');
    const { Logico } = require('../Clases/Expresiones/Logico');
    const { Retorno } = require('../Clases/Expresiones/Retorno');
    const { LlamadaFuncion } = require('../Clases/Expresiones/LlamadaFuncion');
    // Instrucciones
    const { DeclaracionID } = require('../Clases/Instrucciones/DeclaracionID');
    const { Reasignacion } = require('../Clases/Instrucciones/Reasignacion');
    const { Imprimir } = require('../Clases/Instrucciones/Imprimir');
    const { Si } = require('../Clases/Instrucciones/Si');
    const { Funcion } = require('../Clases/Instrucciones/Funcion');
    const { Para } = require('../Clases/Instrucciones/Para');
    const { Incremento } = require('../Clases/Instrucciones/Incremento');
%}

// Precedencia de operadores
%left 'TK_or'
%left 'TK_and'
%right 'TK_not'
%left 'TK_igualdad', 'TK_mayorIgual', 'TK_menorIgual', 'TK_mayor', 'TK_menor'
%left 'TK_mas', 'TK_menos'
%left 'TK_multiplicacion', 'TK_division'
%left 'TK_parAbre', 'TK_parCierra'

// %right TK_negacionUnaria

// Gramatica
%start INICIO
%%

INICIO : INSTRUCCIONES EOF {return $1} |
        EOF                {return []} ;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION {$$.push($2)} |
                INSTRUCCION               {$$ = [$1]  } ;

INSTRUCCION :
            DECLARACION_VAR {$$ = $1} |
            REASIGNACION TK_puntoComa {$$ = $1} |
            IMPRIMIR TK_puntoComa       {$$ = $1} |
            INCREMENTO   {$$ = $1} |
            CONDICIONAL_SI  {$$ = $1} |
            CICLO_PARA      {$$ = $1} |
            FUNCION         {$$ = $1} |
            RETORNAR TK_puntoComa        {$$ = $1} |
            error           {errores.push(new Error(this._$.first_line, this._$.first_column + 1, TipoError.SINTACTICO, `No se esperaba «${yytext}»`))} ;

DECLARACION_VAR :
            TIPO TK_id TK_con TK_valor EXPRESION TK_puntoComa {$$ = new DeclaracionID(@1.first_line, @1.first_column, $2, $1, $5)} ;

REASIGNACION : TK_id TK_asignacion EXPRESION {$$ = new Reasignacion(@1.first_line, @1.first_column, $1, $3)} ;

IMPRIMIR :
            TK_imprimir EXPRESION {$$ = new Imprimir(@1.first_line, @1.first_column, $2)} ;

// Instrucciones
// === CONDICIONAL SI ===
CONDICIONAL_SI : TK_if TK_parAbre EXPRESION TK_parCierra TK_llaveAbre INSTRUCCIONES TK_llaveCierra {$$ = new Si(@1.first_line, @1.first_column, $3, $6)} ;

// === CICLO PARA ===
CICLO_PARA : TK_para TK_parAbre REASIGNACION TK_puntoComa EXPRESION TK_puntoComa EXPRESION TK_parCierra TK_llaveAbre INSTRUCCIONES TK_llaveCierra ;

// === Funciones ===
FUNCION : TK_funcion TIPO TK_id TK_parAbre TK_parCierra TK_llaveAbre INSTRUCCIONES TK_llaveCierra {$$ = new Funcion(@1.first_line, @1.first_column, $3, $2, $7)} ;

// Expresiones
EXPRESION : 
            ARITMETICOS  {$$ = $1} |
            RELACIONALES {$$ = $1} |
            LOGICOS      {$$ = $1} |
            CASTEO                 |
            LLAMADA_FUNCION           {$$ = $1} |
            TK_id      {$$ = new AccesoID(@1.first_line, @1.first_column, $1              )} |
            TK_int     {$$ = new Primitivo(@1.first_line, @1.first_column, $1, Tipo.ENTERO)} |
            TK_decimal {$$ = new Primitivo(@1.first_line, @1.first_column, $1, Tipo.DOUBLE)} |
            TK_string  {$$ = new Primitivo(@1.first_line, @1.first_column, $1, Tipo.CADENA)} |
            TK_parAbre EXPRESION TK_parCierra {$$ = $2} ;

ARITMETICOS : 
            EXPRESION TK_mas EXPRESION            {$$ = new Aritmetico(@1.first_line, @1.first_column, $1, $2, $3)} |
            EXPRESION TK_menos EXPRESION          {$$ = new Aritmetico(@1.first_line, @1.first_column, $1, $2, $3)} |
            EXPRESION TK_multiplicacion EXPRESION {$$ = new Aritmetico(@1.first_line, @1.first_column, $1, $2, $3)} |
            EXPRESION TK_division EXPRESION       {$$ = new Aritmetico(@1.first_line, @1.first_column, $1, $2, $3)} ;

RELACIONALES :
            EXPRESION TK_igualdad EXPRESION   {$$ = new Relacional(@1.first_line, @1.first_column, $1, $2, $3)} |
            EXPRESION TK_mayor EXPRESION      {$$ = new Relacional(@1.first_line, @1.first_column, $1, $2, $3)} |
            EXPRESION TK_menor EXPRESION      {$$ = new Relacional(@1.first_line, @1.first_column, $1, $2, $3)} |
            EXPRESION TK_mayorIgual EXPRESION {$$ = new Relacional(@1.first_line, @1.first_column, $1, $2, $3)} |
            EXPRESION TK_menorIgual EXPRESION {$$ = new Relacional(@1.first_line, @1.first_column, $1, $2, $3)} ;

LOGICOS :
            EXPRESION TK_and EXPRESION {$$ = new Logico(@1.first_line, @1.first_column, $1, $2, $3)}|
            EXPRESION TK_or EXPRESION  {$$ = new Logico(@1.first_line, @1.first_column, $1, $2, $3)}|
            TK_not EXPRESION           {$$ = new Logico(@1.first_line, @1.first_column, undefined, $1, $2)};

INCREMENTO : EXPRESION TK_mas TK_mas {$$ = new Incremento(@1.first_line, @1.first_column, $1)} ;

CASTEO :
        TK_parAbre TIPO TK_parCierra EXPRESION ;

RETORNAR :
        TK_retornar EXPRESION {$$ = new Retorno(@1.first_line, @1.first_column, $2)} ;

LLAMADA_FUNCION : TK_ejecutar TK_id TK_parAbre TK_parCierra {$$ = new LlamadaFuncion(@1.first_line, @1.first_column, $2, undefined)} ;

TIPO : 
        TK_entero {$$ = Tipo.ENTERO} | 
        TK_double {$$ = Tipo.DOUBLE} |
        TK_cadena {$$ = Tipo.CADENA} ;