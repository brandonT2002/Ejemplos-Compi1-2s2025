# Ejemplos Lab - Compi1

## Archivo de Entrada - Proyecto 1
```
// Automata Finito Determinista: reconoce cadenas que terminan en 0
<AFD Nombre="AFD_Simple">
    N = {S, F}; 
    T = {0, 1}; 
    I = {S}; 
    A = {F}; 
Transiciones:
    S -> 0, F | 1, S ;
    F -> 0, F | 1, S ;
</AFD>

// Automata Finito Determinista: pares de 1’s
<AFD Nombre="AFD_Par1">
    N = {S, A}; 
    T = {0, 1}; 
    I = {S}; 
    A = {S}; 
Transiciones:
    S -> 0, S | 1, A ;
    A -> 0, A | 1, S ;
</AFD>

// Autómata de Pila: balance de un par de "ab"
<AP Nombre="AP_ab">
    N = {I, P, F}; 
    T = {a, b}; 
    P = {a, #}; 
    I = {I}; 
    A = {F}; 
Transiciones:
    I ($) -> ($), P : (#) ;
    P (a) -> ($), P : (a) ;
    P (b) -> (a), P : ($) ;
    P ($) -> (#), F : ($) ;
</AP>

// Autómata de Pila: balance general de "a^n b^n"
<AP Nombre="AP_anbn">
    N = {I, A, F}; 
    T = {a, b}; 
    P = {a, #}; 
    I = {I}; 
    A = {F}; 
Transiciones:
    I ($) -> ($), A : (#) ;
    A (a) -> ($), A : (a) ;
    A (b) -> (a), A : ($) ;
    A ($) -> (#), F : ($) ;
</AP>

// Pruebas de ejecución
verAutomatas();
desc(AFD_Simple);
desc(AP_ab);
AFD_Simple("1010");
AFD_Par1("1101");
AP_ab("ab");
AP_anbn("aaabbb");

```

## Archivo de Entrada - Proyecto 1 (v2)
```
<AFD Nombre="Numeros"> 
    N = {S0, S1, S2, S3};
    T = {0, 1};
    I = {S0};
    A = {S1, S3};
Transiciones: 
    S0 -> 1, S1 ;
    S1 -> 1, S1 | 0, S2 ;
    S2 -> 0, S3 ;
    S3 -> 0, S3 ;
</AFD>

<AFD Nombre="Alfabeticos"> 
    N = {E0, E1, E2, E3, E4, E5, E6};
    T = {a, b, c, d, e, f, g, h};
    I = {E0};
    A = {E4};
Transiciones: 
    E0 -> h, E1 | b, E2 | c, E3 | a, E4 ;
    E1 -> b, E2 | c, E3 | a, E4 ;
    E2 -> c, E4 ;
    E3 -> d, E4 ;
    E4 -> a, E4 | b, E5 | c, E6 ;
    E5 -> c, E4 ;
    E6 -> d, E4 ;
</AFD>

<AFD Nombre="Alfanumericos"> 
    N = {S0, S1, S2, S3, S4, S5, S6, S7, S8};
    T = {a, b, c, x, y, z, 0, 1};
    I = {S0};
    A = {S3, S6, S7};
Transiciones: 
    S0 -> a, S1 | x, S2 | 1, s3;
    S1 -> b, S4 | x, S2 ;
    S2 -> y, S5 ;
    S3 -> 0, S3 ;
    S4 -> c, S6 ;
    S5 -> z, S7 ;
    S6 -> a, S8 ;
    S8 -> b, S4 ;
</AFD>

<AFD Nombre="Letras"> 
    N = {E0, E1, E2, E3, E4, E6, E7};
    T = {a, b, c};
    I = {E0};
    A = {E7};
Transiciones: 
    E0 -> a, E1 | b, E2 | c, E3 ;
    E1 -> a, E1 | c, E4 ;
    E2 -> b, E5 ;
    E3 -> c, E3 | b, E6 ;
    E4 -> b, E6 ;
    E5 -> c, E4 ;
    E6 -> a, E7 ;
</AFD>
```