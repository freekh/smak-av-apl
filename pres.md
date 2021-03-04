# En smak av APL

> We would like to have you discover a new land, a land where people who may or may not be specialists in programming can process their data, build computerised applications, and take pleasure in using a programming language which is an extremely elegant and powerful tool of thought.

<quote-author>Mastering Dyalog APL</quote-author>

---

# Disclaimer

> Ikke en APL spesialist

<quote-author>Fredrik</quote-author>

<note>Jeg ville snakke om APL fordi jeg har hatt lyst til å lære meg noe nytt en stund</note>

---

## OMG TLTR;

<note>too lame to read</note>

- Rare symboler
- Rar syntax
- Multidimensjonal array / matrise basert
- **Nydelig** retro holdning

### Dyalog

```dyalog
Plus ← {⍺+⍵}
Times ← {⍺×⍵}
```

### K

```k
s:4225 1619 3706 2240 2076 1389 3916 3918 4939 2735
c:3 1 3 2 2 1 3 3 3 2
r:8 5 2%100
s*r[c]
```

---

## K: all the docs 😂

```
*ffi: a:"./a.so"5:`f!"ii";a.f[2;3] / int f(int i,int j){return i+j;}
*k/c: b:"./b.so"5:`f!2   ;b.f[2;3] / K f(K x,K y){return ki(xi+yi);}
`csv?`csv t:,`js?`js d:[d:.z.d;t:.z.t;n:`ab;i:23;f:4.5]
python: import k;k.k('+',2,3); nodejs: require('k').k('+',2,3)

verb                   adverb                  noun
: x         y          f' each      g' each    char " ab"              \l a.k
+ flip      plus    [x]f/ over      c/ join    name ``ab               \t:n x
- minus     minus   [x]f\ scan      c\ splt    int  2 3                \u:n x
* first     times   [y]f':eachprior            flt  2 3.4 0w 0n        \v
%           divide     f/:eachright g/:over    date 2021.06.28   .z.d
& where     min/and    f\:eachleft  g\:scan    time 12:34:56.789 .z.t
| reverse   max/or
< asc       less       i/o (*enterprise)       class                   \f
> desc      more       0: r/w line (N;C)0:     list (2;3.4;`c)         \fl x
= group     equal      1: r/w char             dict [n:`b;i:2]         \fc x
~ not       match     *2: r/w data             func {[a;b]a+b}         \fs x
! key       key       *3: k-ipc set            expr :a+b               \cd [d]
, enlist    cat       *4: https get
^ sort   [f]cut       *5: ffi/iff[py/js/..]    table [[]n:`b`c;i:2 3]
# count  [f]take                              utable  [[n:`b`c]i:2 3]
_ floor  [f]drop
$ string    parse      $[b;t;f] cond
? unique [n]find                               limit
@ type   [n]at         @[x;i;f[;y]] amend      name8(*256)
. value     dot        .[x;i;f[;y]] dmend      code p8 l8 g32 c128

select A by B from T where C; update A from T; delete from T where C
count first last min max sum dot avg var [dev med mode ..]
sqrt sqr exp log sin cos div mod bar in bin
/comment \trace [:return 'signal if do while] \\exit
```

---

## K (cont'ed)

#### Operasjoner over arrays:

```k
r:8 5 2%100
r
```

#### Funksjoner:

```k
f:{x+1}
f[2]
```

#### Index operasjoner:

```k
a:1 2 3
a[0]
```

---

## K (cont'ed)

```k
salary:4225 1619 3706 2240 2076 1389 3916 3918 4939 2735
category:3 1 3 2 2 1 3 3 3 2
rate:8 5 2%100
salary*rate[category]
```

#### Idiomatisk (!):

```k
s:4225 1619 3706 2240 2076 1389 3916 3918 4939 2735
c:3 1 3 2 2 1 3 3 3 2
r:8 5 2%100
s*r[c]
```

---

## Mer fun facts

### Monadic

```k
#1 2 3
```

### Dyadic

```k
2#3
```

---

## Case studie: alle kombinasjoner

#### 1.

```k
#1 2 3
```

#### 2.

```k
2##1 2 3
```

#### 3.

```k
!2##1 2 3
```

---

## Case studie: AOC

> In a list of numbers, find the two entries that sum to 2020 and then multiply those two numbers together.

#### En (min) løsning på dag 1, del 1:

```k
i:1721 979 366 299 675 1456
f:{*(~)_x'i} / first non-null in i for a function x
f{f{(2020=x+y)*x*y}x}
```

---

## Prelude utils

#### Funksjoner med > 1 args:

```k
sumorzero:{2020=x+y}
sumorzero[1721;299]
```

#### Map:

```k
i:1721 979 366 299 675 1456
{x>700}'i
```

#### Ta alle over 700:

```k
i:1721 979 366 299 675 1456
(~)_{x>700}'i
```

#### Ta den første:

```k
i:1721 979 366 299 675 1456
*i
```

---

## Case studie: AOC (cont'ed)

> In a list of numbers, **find the two entries that sum to 2020** and then multiply those two numbers together.

#### Nå kan vi lage f:

```k
i:1721 979 366 299 675 1456
f:{*(~)_x'i} / first non-null in i for a function x
f{2020=x+y}[366]
```

#### Den vi ser etter:

```k
i:1721 979 366 299 675 1456
f:{*(~)_x'i} /  first non-null in i for a function x
f{2020=x+y}[299]
```

#### 1 betyr vi fant, så lag resultat:

```k
i:1721 979 366 299 675 1456
f:{*(~)_x'i} /  first non-null in i for a function x
f{(2020=x+y)*x*y}[299]
```

---

## Case studie: AOC (cont'ed)

#### Gjør det samme for ALLE:

```k
i:1721 979 366 299 675 1456
f:{*(~)_x'i} / first non-null in i for a function x
{f{(2020=x+y)*x*y}x}'i
```

#### Ta den første ikke null av ALLE:

```k
i:1721 979 366 299 675 1456
f:{*(~)_x'i} / first non-null in i for a function x
f{f{(2020=x+y)*x*y}x}
```

---

# Takk!

<note>

Si noe Arthur Whitney?

kdb dropper vi for øyeblikket

Idioms! MMosomt!

Både Dyalog og K ble lagd på et tidspunkt der tanken var at hvem-som-helst skulle plukke det.
I et alternativt univers har man sikkert ingen profesjonelle utviklere og banker som bare kjører alt i APL.

Det er derfor det er så ironisk at det nettopp er ekstremt vanskelig å lese.

Ville bare si litt om historien her fordi jeg synes det er litt ekstra morsomt.

Monadisk, dyadisk
Endelig en definisjon på monadisk som alle kan forstå :D

Gullkorn:
Om hvorfor APL parser omvendt av andre språk :)

```
It  may  take  a  little  while  to  get  used  to  this  slightly  unfamiliar  rule,  but  once  it  has  been learned it is really a great advantage because you can direct your energy towards solving your problem  and  not  have  to  remember  complex  rules  just  to  satisfy  the  computer's  need  for guidance.
```

</note>
