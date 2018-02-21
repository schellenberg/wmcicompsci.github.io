<!-- Be sure to include the following in the head of the resulting HTML! -->

<script type="text/x-mathjax-config">
MathJax.Hub.Config({
  tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}
});
<script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-MML-AM_CHTML'></script> 

# ACSL - Contest 3 Preparation

## Boolean Algebra

### Boolean Algebra Tutorial Video

[General Boolean Algebra Tutorial](https://www.youtube.com/watch?v=jDnni-zm2g8)

<iframe width="560" height="315" src="https://www.youtube.com/embed/jDnni-zm2g8" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

### Order of Operations

- `NOT`
- `AND` and `NAND`
- `XOR` and `EQUIV`
- `OR` and `NOR`
- if same precedence, evaluate from left to right

### Boolean Algebra Identities

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

### ACSL Overview

You might find it helpful to [read the overview of boolean algebra from the ACSL](boolean_algebra.pdf).

## Data Structures

### Data Structures Tutorial Videos

[Construct a Binary Search Tree](https://www.youtube.com/watch?v=_BnbbOhyroQ&index=2&list=PLGq6KgRCPkA6Qb4kpiH8h0ghjpCfomATr)

<iframe width="560" height="315" src="https://www.youtube.com/embed/_BnbbOhyroQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

[Internal Path Length of Binary Search Tree](https://www.youtube.com/watch?v=l9aMO7lgHj0&index=3&list=PLGq6KgRCPkA6Qb4kpiH8h0ghjpCfomATr)

<iframe width="560" height="315" src="https://www.youtube.com/embed/l9aMO7lgHj0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

[Stacks and Queues](https://www.youtube.com/watch?v=gXj7K_petqo&index=8&list=PLGq6KgRCPkA6Qb4kpiH8h0ghjpCfomATr)

<iframe width="560" height="315" src="https://www.youtube.com/embed/gXj7K_petqo" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

### Key Things to Remember

- a **stack** is LIFO (**L**ast **I**n, **F**irst **O**ut)
    - you can remember this as similar to a stack of books on a desk (when you add a book to the pile, it goes on the top of the pile; when you take a book off the pile, it also comes from the top of the pile)
- a **queue** is FIFO (**F**irst **I**n, **F**irst **O**ut)
    - you can remember this as similar to a line up for a water fountain (when a new person is added to the line, they go to the back of the line; when a person leaves the line, they exit from the front of the line)
- both data structures allow you to **push** (add new data), and **pop** (remove/access data). The only difference is where you push/pop to/from.

- for a binary search tree, the first node is counted as depth 0 (similar to how we often count from the 0-th element when using arrays/lists)
- terminology:
    - *root* is the uppermost node (at depth of 0)
    - *leaf nodes* are nodes with no children
    - *depth* of the tree can be found by counting the depth of the deepest node
    - *internal path length* is the sum of the depth of all the nodes
    - *external node* is anywhere a new node could be attached to the tree
    - *external path length* is the sum of the depths of all external nodes

### ACSL Overview

You might find it helpful to [read the overview of data structures from the ACSL](data_structures.pdf).

## Regular Expressions

Can be used to find patterns. We can convert between an algebraic expression of the regular expression, or a FSA (Finite State Automaton) representation.

### Regular Expression Tutorial Video

[Convert Regular Expression to Finite-State Automaton](https://www.youtube.com/watch?v=GwsU2LPs85U)

<iframe width="560" height="315" src="https://www.youtube.com/embed/GwsU2LPs85U" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

### ACSL Overview

You might find it helpful to [read the overview of regular expressions from the ACSL](regular_expressions.pdf).
