<!-- Be sure to include the following in the head of the resulting HTML!

<script type="text/x-mathjax-config">
MathJax.Hub.Config({
  tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}
});
<script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-MML-AM_CHTML'></script> 
-->

# Boolean Algebra

## Order of Operations

- `NOT`
- `AND` and `NAND`
- `XOR` and `EQUIV`
- `OR` and `NOR`
- if same precedence, evaluate from left to right

## Boolean Algebra Identities

1. $ A + B = B + A $
2. $ A * B = B * A $
3. $ A + (B + C) = (A + B) + C $
4. $ A * (B * C) = (A * B) * C $
5. $ A * (B + C) = A * B + A * C $
6. $ \overline{A+B} =\overline{A}*\overline{B} $
7. $ \overline{A*B} =\overline{A}+\overline{B} $
8. $ A + 0 = A $
9. $ A * 0 = 0 $
10. $ A + 1 = 1 $
11. $ A * 1 = A $
12. $ A + \overline{A} = 1 $
13. $ A * \overline{A} = 0 $
14. $ A + A = A $
15. $ A * A = A $
16. $ \overline{\overline{A}} = A $
17. $ A + \overline{A} * B = A + B $
18. $ (A + B) * (C + D) = A * C + A * D + B * C + B * D $
19. $ (A + B) * (A + C) = A + B * C $
20. $ A * (A + B) = A $
21. $ A \oplus B = A * \overline{B} + \overline{A} * B $
22. $ \overline{A \oplus B} = \overline{A} \oplus B = A \oplus \overline{B} $

