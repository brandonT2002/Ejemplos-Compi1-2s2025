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