package com.doobgroup.server.interceptors;

import java.util.Collection;

import javax.interceptor.AroundInvoke;
import javax.interceptor.InvocationContext;

import com.doobgroup.server.util.PostDeserializer;


/**
 * This interceptor takes part after deserialization  of JSON object. 
 * After JSON object has been deserialized, this interceptor restores child-to-parent references that was removed during
 * serialization due to infinite recursion problem in JSON serializer.
 *
 */
public class BidirectionalDeserializerInterceptor {
	@AroundInvoke
	public Object intercept(InvocationContext context) throws Exception {
		//iterate through all method parameters
		for (Object object : context.getParameters()) {
			//if the parameter is a collection, restore references for all its elements			
			if (object instanceof Collection) { 
				PostDeserializer postDeserializer = new PostDeserializer();
				postDeserializer.postDeserialization(object);
			} else {
				// if the object is java bean, restore its containing references
				PostDeserializer postDeserializer = new PostDeserializer();
				postDeserializer.postDeserialization(object);
			}
		}
		Object result = context.proceed(); //call next interceptor in the chain
		return result;
	}
}
