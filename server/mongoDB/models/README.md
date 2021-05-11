The requirements listed below influence the detailed structure of schemas that are produced. Certain applications will not require that all of these conditions are met, but these four requirements are the most ideal.

**Overlap preservation**
Each of the overlapping elements specified in the input mapping is also in a database schema relation.
Extended overlap preservation
Source-specific elements that are associated with a source’s overlapping elements are passed through to the database schema.
**Normalization**
Independent entities and relationships in the source data should not be grouped together in the same relation in the database schema. In particular, source specific schema elements should not be grouped with overlapping schema elements, if the grouping co-locates independent entities or relationships.
**Minimality**
If any elements of the database schema are dropped then the database schema is not idea