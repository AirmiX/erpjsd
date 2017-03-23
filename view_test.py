from __future__ import unicode_literals
import os
from os.path import dirname, join
from textx.metamodel import metamodel_from_file
from textx.export import metamodel_export, model_export


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


def get_view_mm(debug=False):
    """
    Builds and returns a meta-model for view language.
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
    view_mm = metamodel_from_file(join(this_folder, 'view.tx'),
                                    classes=[SimpleType],
                                    builtins=type_builtins,
                                    debug=debug)

    return view_mm


def main(debug=False):

    view_mm = get_view_mm(debug)

    # Export to .dot file for visualization
    dot_folder = join(this_folder, 'dotexport')
    if not os.path.exists(dot_folder):
        os.mkdir(dot_folder)
    metamodel_export(view_mm, join(dot_folder, 'view_meta.dot'))

    # Build proba model from test.ent file
    proba_model = view_mm.model_from_file(join(this_folder, 'test.ent'))

    # Export to .dot file for visualization
    model_export(proba_model, join(dot_folder, 'proba.dot'))



if __name__ == "__main__":
    main()
