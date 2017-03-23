package com.doobgroup.server.util;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;




@ApplicationPath("/api")
public class DoobApplication extends Application {

    @SuppressWarnings("rawtypes")
	@Override
    public Set<Class<?>> getClasses() {
        final Set<Class<?>> classes = new HashSet<Class<?>>();
        // register root resource
		try {
			for (Class clazz : ClassUtils.getClasses("com.doobgroup.server.services")) {
			    classes.add(clazz);
			}
		} catch (ClassNotFoundException | IOException e) {
			e.printStackTrace();
		}

        return classes;
    }    
   
}
