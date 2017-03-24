from __future__ import unicode_literals
import os
from os.path import dirname, join
from textx.metamodel import metamodel_from_file
from textx.export import metamodel_export, model_export
import pydot

this_folder = dirname(__file__)


class SimpleType(object):
    """
    We are registering user SimpleType class to support
    simple types (integer, string) in our view models
    Thus, user doesn't need to provide integer and string
    types in the model but can reference them in attribute types nevertheless.
    """
    def __init__(self, parent, name):
        self.parent = parent
        self.name = name

    def __str__(self):
        return self.name


def get_erpdsl_mm(debug=False):
    """
    Builds and returns a meta-model for erpdsl language.
    """
    # Built-in simple types
    # Each model will have this simple types during reference resolving but
    # these will not be a part of `types` list of viewModel.
    type_builtins = {
            'int': SimpleType(None, 'int'),
            'double': SimpleType(None, 'double'),
            'text': SimpleType(None, 'text'),
            'char': SimpleType(None, 'char'),
            'bool': SimpleType(None, 'bool'),
            'date': SimpleType(None, 'date'),
            'datetime': SimpleType(None, 'datetime'),
            'image': SimpleType(None, 'image')

    }
    erpdsl_mm = metamodel_from_file(join(this_folder, 'erpdsl.tx'),
                                    classes=[SimpleType],
                                    builtins=type_builtins,
                                    debug=debug)

    return erpdsl_mm


def main(debug=False):

    erpdsl_mm = get_erpdsl_mm(debug)

    # Export to .dot file for visualization
    dot_folder = join(this_folder, 'dotexport')
    if not os.path.exists(dot_folder):
        os.mkdir(dot_folder)
    metamodel_export(erpdsl_mm, join(dot_folder, 'erpdsl_meta.dot'))

    graph_mm = pydot.graph_from_dot_file(join(dot_folder, 'erpdsl_meta.dot'))
    graph_mm[0].write_png(join(dot_folder, 'erpdsl_meta.png'))

    # Build proba model from erpdsl.edl file
    test_model = erpdsl_mm.model_from_file(join(this_folder, 'erpdsl.edl'))

    # Export to .dot file for visualization
    model_export(test_model, join(dot_folder, 'erpdsl.dot'))


if __name__ == "__main__":
    main()
