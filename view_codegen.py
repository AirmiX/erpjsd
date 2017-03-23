from os import mkdir
from os.path import exists, dirname, join
import jinja2
from textx.metamodel import metamodel_from_file
import shutil

this_folder = dirname(__file__)


class SimpleType(object):
    def __init__(self, parent, name):
        self.parent = parent
        self.name = name

    def __str__(self):
        return self.name


def get_view_mm():
    """
    Builds and returns a meta-model for View language.
    """
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
                                    builtins=type_builtins)

    return view_mm


def main(debug=False):

    # Instantiate the View meta-model
    view_mm = get_view_mm()

    ##### OUTPUT FOLDERS #####

    # Create the output folder
    srcgen_folder = join(this_folder, 'srcgen')
    if not exists(srcgen_folder):
        mkdir(srcgen_folder)

    # Backend output folder
    backend_folder = join(srcgen_folder, 'DoobIISServer', 'src', 'com', 'doobgroup', 'server')
    if not exists(backend_folder):
        mkdir(backend_folder)

    # META-INF folder
    persistence_path = join(srcgen_folder, 'DoobIISServer', 'WebContent', 'META-INF')
    if not exists(persistence_path):
        mkdir(persistence_path)

    # Frontend output folder
    frontend_folder = join(srcgen_folder, 'DoobClient', 'src', 'app')
    if not exists(frontend_folder):
        mkdir(frontend_folder)

    # Entity output folder
    entity_path = join(backend_folder, "entities")
    if not exists(entity_path):
        mkdir(entity_path)
#    if exists(entity_path):
#        shutil.rmtree(entity_path)
#    mkdir(entity_path)

    # Service output folder
    service_path = join(backend_folder, "services")
    if not exists(service_path):
        mkdir(service_path)

#    if exists(service_path):
#        shutil.rmtree(service_path)
#    mkdir(service_path)

    # SessionBean output folder
    sessionbean_path = join(backend_folder, "sessionbeans")
#    if exists(sessionbean_path):
#        shutil.rmtree(sessionbean_path)
    if not exists(sessionbean_path):
        mkdir(sessionbean_path)

    # Localization output folder
    localization_path = join(frontend_folder, "resources")

    ############################

    ##### HELPER FUNCTIONS #####

    def javatype(s):
        """
        Maps type names from SimpleType to Java.
        """
        return {
            'int': 'int',
            'double': 'double',
            'text': 'String',
            'char': 'char',
            'bool': 'Boolean',
            'date': 'Date',
            'datetime': 'Date',
            #'image': 'Image'
            'image': 'String'
        }.get(s.name, s.name)

    first_lower = lambda s: s[:1].lower() + s[1:] if s else ''

    first_upper = lambda s: s[:1].upper() + s[1:] if s else ''

    add_prefix = lambda name: name.join(c for c in s if c.isupper())

    limit_string = lambda name: name.substring(0, 30) if name.length > 30 else name

    limit_string_offset = lambda name, offset: name.substring(0, 30-offset) if name.length + offset > 30 else name

#    def is_dependent(entity):
#        for ent in test_model.entities:
#            for rel in ent.relationships:
#                if rel.entity == entity and rel.identifiedBy:
#                    return True
#        return False

    def is_dependent(entity):
        for rel in entity.relationships:
            if rel.identifiedBy:
                return True
        return False

    def is_item(entity):
        for ent in test_model.entities:
            for rel in ent.relationships:
                if rel.entity == entity and rel.subEntity:
                    return True
        return False

    def has_items(entity):
        for relationship in entity.relationships:
            if relationship.subEntity:
                return True
        return False

    def get_sub_entity(entity):
        for relationship in entity.relationships:
            if relationship.subEntity:
                return relationship.entity
        return None

    def get_sub_entity_relationship(entity):
        for relationship in entity.relationships:
            if relationship.subEntity:
                return relationship
        return None

    def get_distinct_relationship_entities(view):
        result = [];
        for relationship in view.relationships:
            if relationship.view.entity not in result:
                result.append(relationship.view.entity)
        return result

    def get_distinct_relationship_entities_2(entity):
        result = [];
        for relationship in entity.relationships:
            if relationship.entity not in result:
                result.append(relationship.entity)
        return result

    def get_relationship_by_entity(entity_location, entity_target):
        for relationship in entity_location.relationships:
            if relationship.entity.name == entity_target.name:
                return relationship
        return None

    ############################

    ##### TEMPLATES #####

    templates_folder = join(this_folder, 'templates')

    # Initialize the template engine.
    jinja_env = jinja2.Environment(
        loader=jinja2.FileSystemLoader(this_folder),
        trim_blocks=True,
        lstrip_blocks=True)

    # Register the filter for mapping View type names to Java type names.
    jinja_env.filters['javatype'] = javatype
    jinja_env.filters['firstlower'] = first_lower
    jinja_env.filters['firstupper'] = first_upper
    jinja_env.filters['add_prefix'] = add_prefix
    jinja_env.filters['limit_string'] = limit_string
    jinja_env.filters['limit_string_offset'] = limit_string_offset
    jinja_env.tests['is_dependent'] = is_dependent
    jinja_env.tests['is_item'] = is_item
    jinja_env.tests['has_items'] = has_items
    jinja_env.globals['get_sub_entity'] = get_sub_entity
    jinja_env.globals['get_sub_entity_relationship'] = get_sub_entity_relationship
    jinja_env.globals['get_distinct_relationship_entities'] = get_distinct_relationship_entities
    jinja_env.globals['get_distinct_relationship_entities_2'] = get_distinct_relationship_entities_2
    jinja_env.globals['get_relationship_by_entity'] = get_relationship_by_entity

    # Load templates

    entity_bean_template = jinja_env.get_template(join(templates_folder, 'javaee', 'entity_bean_template.j2'))
    service_bean_template = jinja_env.get_template(join(templates_folder, 'javaee', 'service_bean_template.j2'))
    session_bean_template = jinja_env.get_template(join(templates_folder, 'javaee', 'session_bean_template.j2'))
    session_bean_interface_template = jinja_env.get_template(join(templates_folder, 'javaee', 'session_bean_interface_template.j2'))

    persistence_template = jinja_env.get_template(join(templates_folder, 'javaee', 'persistence.xml_template.j2'))

    side_navigation_template = jinja_env.get_template(join(templates_folder, 'html', 'side_navigation_template.j2'))
    view_template = jinja_env.get_template(join(templates_folder, 'html', 'view_template.j2'))
    details_template = jinja_env.get_template(join(templates_folder, 'html', 'details_template.j2'))
    edit_template = jinja_env.get_template(join(templates_folder, 'html', 'edit_template.j2'))
    choose_template = jinja_env.get_template(join(templates_folder, 'html', 'choose_template.j2'))

    app_template = jinja_env.get_template(join(templates_folder, 'angular', 'app_template.j2'))
    module_app_template = jinja_env.get_template(join(templates_folder, 'angular', 'module_app_template.j2'))
    controller_template = jinja_env.get_template(join(templates_folder, 'angular', 'controller_template.j2'))
    service_template = jinja_env.get_template(join(templates_folder, 'angular', 'service_template.j2'))
    router_template = jinja_env.get_template(join(templates_folder, 'angular', 'router_template.j2'))

    localization_template = jinja_env.get_template(join(templates_folder, 'localization_template.j2'))

    ############################

    # Build a test model from test.ent file
    test_model = view_mm.model_from_file(join(this_folder, 'test.ent'))

    ##### GENERATE CODE #####

    with open(join(frontend_folder, "app.js"), 'w') as f:
        f.write(app_template.render(modules=test_model.modules))

    with open(join(frontend_folder, "sideNavigation.tpl.html"), 'w') as f:
        f.write(side_navigation_template.render(modules=test_model.modules, entities=test_model.entities))

    with open(join(localization_path, "localization.js"), 'w') as f:
        f.write(localization_template.render(modules=test_model.modules, entities=test_model.entities, views=test_model.views))

    with open(join(persistence_path, "persistence.xml"), 'w') as f:
        f.write(persistence_template.render(entities=test_model.entities))

    # Generate code
    for module in test_model.modules:
        # For each module create directory
        module_path = join(frontend_folder, "%s" % module.name.lower())
        if not exists(module_path):
            mkdir(module_path)
        with open(join(module_path, "app%s.js" % module.name), 'w') as f:
            f.write(module_app_template.render(module=module))
        with open(join(module_path, "rt%s.js" % module.name), 'w') as f:
            f.write(router_template.render(module=module, entities=test_model.entities))

    for entity in test_model.entities:

        if entity.module.name.lower() == 'user':
            continue;

        module_path = join(frontend_folder, "%s" % entity.module.name.lower())
        # For each entity create directory inside module directory
        path = join(module_path, "%s" % entity.name.lower())
        if exists(path):
            shutil.rmtree(path)
        mkdir(path)
        with open(join(path, "srv%s.js" % entity.name), 'w') as f:
            f.write(service_template.render(entity=entity))

        path = join(entity_path, "%s" % entity.module.name.lower())
        if not exists(path):
            mkdir(path)
        with open(join(path, "%sBean.java" % entity.name), 'w') as f:
            f.write(entity_bean_template.render(entity=entity))

        path = join(service_path, "%s" % entity.module.name.lower())
        if not exists(path):
            mkdir(path)

        exceptions = ["AppUser", "Service"]
        if entity.name not in exceptions:
            with open(join(path, "%sService.java" % entity.name), 'w') as f:
                f.write(service_bean_template.render(entity=entity))

        path = join(sessionbean_path, "%s" % entity.module.name.lower())
        if not exists(path):
            mkdir(path)

        exceptions = ["Service", "AppUser"]
        if entity.name not in exceptions:
            with open(join(path, "%sBeanDao.java" % entity.name), 'w') as f:
                f.write(session_bean_template.render(entity=entity))

        path = join(sessionbean_path, "%s" % entity.module.name.lower())
        if not exists(path):
            mkdir(path)

        if entity.name not in ["Service", "AppUser"]:
            with open(join(path, "%sBeanDaoLocal.java" % entity.name), 'w') as f:
                f.write(session_bean_interface_template.render(entity=entity))


    for view in test_model.views:

        module_path = join(frontend_folder, "%s" % view.entity.module.name.lower())
        path = join(module_path, "%s" % view.entity.name.lower())

        # For each view generate files in created directory
        with open(join(path, "tmpl%sView.tpl.html" % view.entity.name), 'w') as f:
            f.write(view_template.render(view=view))
        with open(join(path, "tmpl%sDetail.tpl.html" % view.entity.name), 'w') as f:
            f.write(details_template.render(view=view))
        with open(join(path, "tmpl%sEdit.tpl.html" % view.entity.name), 'w') as f:
            f.write(edit_template.render(view=view))
        with open(join(path, "tmpl%sChoose.tpl.html" % view.entity.name), 'w') as f:
            f.write(choose_template.render(view=view))

        with open(join(path, "ctrl%s.js" % view.entity.name), 'w') as f:
            f.write(controller_template.render(view=view))

#        with open(join(localization_path, "localization_en.txt"), 'a') as f:
#            f.write(localization_en_template.render(view=view))
#        with open(join(localization_path, "localization_sr.txt"), 'a') as f:
#            f.write(localization_sr_template.render(view=view))

    ############################

if __name__ == "__main__":
    main()
