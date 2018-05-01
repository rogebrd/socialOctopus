package Misc;

import java.util.LinkedHashMap;

public class Misc {
    //Printer function for full body printing -- debug only
    public static String printer(Object body){
        StringBuilder b = new StringBuilder();
        LinkedHashMap<String, Object> newBody = (LinkedHashMap<String, Object>)body;

        for(String key: newBody.keySet()){
            if(newBody.get(key) instanceof String){
                b.append(key + "--" + newBody.get(key));
            }else {
                b.append(key + "__________");
                LinkedHashMap<String, String> internal = (LinkedHashMap<String, String>) newBody.get(key);
                for (String internalKey : internal.keySet()) {
                    b.append(internalKey + "--" + internal.get(internalKey) + "__________");
                }
            }
        }

        return (b.toString());
    }
}
