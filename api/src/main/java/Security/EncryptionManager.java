package Security;

import Connection.DatabaseConnection;

import java.sql.ResultSet;
import java.util.LinkedHashMap;

public class EncryptionManager {

    public static String verify(DatabaseConnection dbc, Object body) throws Exception{
        LinkedHashMap<String, Object> postBody = (LinkedHashMap<String, Object>) body;
        String token = ((LinkedHashMap<String, String>)postBody.get("headers")).get("sotoken");

        ResultSet res = dbc.SELECT("SELECT userId FROM Utility.users WHERE Token='" + token + "'");

        if (token == null ){
            throw new Exception ("Token is null");
        }

        if(res.next()){
            return (res.getString("userId"));
        }else {
            throw new Exception("Authentication Failed, Received Token is " + token);
        }
    }
}
