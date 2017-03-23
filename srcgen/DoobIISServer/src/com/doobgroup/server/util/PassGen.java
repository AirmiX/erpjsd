package com.doobgroup.server.util;

import org.mindrot.jbcrypt.BCrypt;

public class PassGen {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		System.out.println(BCrypt.hashpw("admin", BCrypt.gensalt()));
	}

}
