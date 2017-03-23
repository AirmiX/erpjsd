package com.doobgroup.server.util;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.text.ParseException;

public class JsonDateDeserializer extends JsonDeserializer<Date>
{
    @Override
    public Date deserialize(JsonParser jsonparser,
            DeserializationContext deserializationcontext) throws IOException, JsonProcessingException {

        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
        String date = jsonparser.getText();
        System.out.println("%%%%%%%%%%%% " + date);
        try {
            return format.parse(date);
        } catch (ParseException e) {
        	format = new SimpleDateFormat("yyyy-MM-dd");
        	try {
                return format.parse(date);
            } catch (ParseException e1) {
            	throw new RuntimeException(e1);
            }            
        }
    }

}