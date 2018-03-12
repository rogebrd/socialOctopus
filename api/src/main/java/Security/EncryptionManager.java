package Security;

import Connection.DatabaseConnection;

import java.sql.ResultSet;
import java.util.LinkedHashMap;

public class EncryptionManager {

    public static String verify(DatabaseConnection dbc, Object body){
        try {
            LinkedHashMap<String, Object> postBody = (LinkedHashMap<String, Object>) body;
            String token = ((LinkedHashMap<String, String>)postBody.get("headers")).get("SOToken");

            ResultSet res = dbc.SELECT("SELECT userId FROM Utlity.users WHERE token='" + token + "'");

            if(res.next()){
                return (res.getString("userId"));
            }
        }catch(Exception e){

        }

        return ("");
    }
}
