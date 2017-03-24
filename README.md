# erpdsl

erpdsl is a domain specific language for modeling ERP systems. It is implemented in textX.
Main concepts in this language are:
    - module
    - entity with properties and relationships
    - view with properties and relationships
Language grammar is placed in `erpdsl.tx` and representing model in `erpdsl.edl` file.
erpdsl also supports generating code. In templates folder there are templates for generating
application backend (Java EE) and frontend (AngularJS with HTML partials). Code is generated
in `srcgen` folder. There are some files that are part of the framework.

## Requirements:
- python
- textX

## Installation:
```
pip install textX
```

## Test model and language and visualize meta-model
`.dot` files for model and meta-model and `.png` are genereted in `dotexport` folder.
```
python erpdsl_test.py
```

## Generate code:
Backend and frontend application are generated in `srcgen` folder.
```
python erpdsl_codegen.py
```
