package com.doobgroup.server.util;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.lang.annotation.Annotation;
import java.lang.reflect.Method;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;

public class DatabaseInit {

	protected void initServices(String sqlFilePath) throws ClassNotFoundException, SecurityException, IOException  {
		PrintWriter writer = new PrintWriter(sqlFilePath, "UTF-8");
		writer.println("delete from appuser_usergroup;");
		writer.println("delete from usergroup_servicegroup;");
		writer.println("delete from service_servicegroup;");
		writer.println("delete from service;");
		writer.println("delete from appuser;");
		writer.println("delete from servicegroup;");
		writer.println("delete from usergroup;");
		writer.println("insert into appuser (APPUSER_ID, UIDENTIFICATIONCODE, UUSERNAME, UPASSWORD, DELETED, VERSION) values (1000, 1000, 'admin', '$2a$10$nIrpjf0xXBjvyZD7VQlAx.3V8Fu5cnYTUG9uINc39aFWyYvG9uJrK', 0, 0);");
		writer.println("insert into usergroup (USERGROUP_ID, UGIDENTIFICATIONCODE, UGNAME, DELETED, VERSION) values (1000, 1000, 'admingroup', 0, 0);");
		writer.println("insert into appuser_usergroup (APPUSER_ID, USERGROUP_ID) values (1000, 1000);");		
		writer.println("insert into servicegroup (SERVICEGROUP_ID, SGIDENTIFICATIONCODE, SGNAME, DELETED, VERSION) values (1000, 1000, 'any', 0, 0);");
		writer.println("insert into usergroup_servicegroup (SERVICEGROUP_ID, USERGROUP_ID) values (1000, 1000);");
		
		//insert services
		writer.println();
		writer.println("-- insert services");
		String classPath="";
		//dodaje Service
		int i = 1;
		for (Class clazz : ClassUtils.getClasses("com.doobgroup.server.services")) {
			for (Annotation annotation : clazz.getAnnotations()) {
				if(annotation instanceof Path){
					Path path = (Path) annotation;
					classPath = path.value();
			}
			}
			for (Method method : clazz.getMethods()) {
				String uri = null;
				String serviceMethodName = null;
				for (Annotation annotation : method.getAnnotations()) {
					if(annotation instanceof Path){
						Path path = (Path) annotation;
						uri = classPath + "/" + path.value();
					}
					if(annotation instanceof GET){
						serviceMethodName = "GET";
					}
					if(annotation instanceof POST){
						serviceMethodName = "POST";
					}
					if(annotation instanceof PUT){
						serviceMethodName = "PUT";
					}
					if(annotation instanceof DELETE){
						serviceMethodName = "DELETE";
					}
				}				
				if(serviceMethodName != null){
					if (uri == null) {
						uri = classPath;
					}
					//log.info("service uri: "+uri);
					writer.println("insert into service (SERVICE_ID, SIDENTIFICATIONCODE, smethod, suri, deleted, version) values ("
							+ String.valueOf(i) + ", "+ String.valueOf(i) + ", '" + serviceMethodName + "'," + "'" + uri + "', 0, 0);");
					writer.println("insert into service_servicegroup (SERVICE_ID, SERVICEGROUP_ID) values ("
							+ String.valueOf(i) + ", 1000);" );
					i++;
				}
			}
		}
		
		
		
			
		
		writer.close();
		
		
		
	}
	
	public static void main(String[] args) {
		DatabaseInit dbinit = new DatabaseInit();
		try {
			dbinit.initServices("insertservices.sql");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
