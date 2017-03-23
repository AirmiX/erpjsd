package com.doobgroup.server.util;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class FileHelper {
	public static void inputStreamToFile(InputStream inputStream, String destPath) {
    	OutputStream outputStream = null;     
    	try {    
    		outputStream = new FileOutputStream(new File(destPath));     
    		int read = 0;
    		byte[] bytes = new byte[1024];     
    		while ((read = inputStream.read(bytes)) != -1) {
    			outputStream.write(bytes, 0, read);
    		}     
    	} catch (IOException e) {
    		e.printStackTrace();
    	} finally {
    		if (inputStream != null) {
    			try {
    				inputStream.close();
    			} catch (IOException e) {
    				e.printStackTrace();
    			}
    		}
    		if (outputStream != null) {
    			try {
    				outputStream.close();
    			} catch (IOException e) {
    				e.printStackTrace();
    			}     
    		}
    	}
    }
}
