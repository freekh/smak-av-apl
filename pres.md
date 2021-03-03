# En smak av APL

---

## Intro

Første APLen ble lagd på 50 talllet. Kjennetegn weird syntax :) og multi dimensjonelle array "basert"

Ganske populært på 70 tallet.
De fleste APLer er vel det man (jeg) idag vil kalle en esoterisk programmeringsspråk.

![](http://www.aplusdev.org/keyboard.gif)

La oss ta en kjapp titt på et par av de:

### Dyalog

TODO: eksempel
https://www.dyalog.com/uploads/documents/MasteringDyalogAPL.pdf

---

### K

The man, the legend
Arthur Whitney

kdb dropper vi for øyeblikket

Idioms!

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

In a list of numbers, find the two entries that sum to 2020 and then multiply those two numbers together.

```k
i:`i$'0:"1_input.txt"
f:{*(~)_x'i}
/ halllo
f{f{(2020=x+y)*x*y}x}
```

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

Interresante nye måter å tenke på rundt array. La oss ta en titt på dette idiomet som tok meg litt tid å finne ut av:

```k
!2##1 2 3
```
