package Security;

import Connection.DatabaseConnection;

import java.sql.ResultSet;
import java.util.LinkedHashMap;

public class EncryptionManager {

    public static String verify(DatabaseConnection dbc, Object body) throws Exception{
            LinkedHashMap<String, Object> postBody = (LinkedHashMap<String, Object>) body;
            String token = ((LinkedHashMap<String, String>)postBody.get("headers")).get("SOToken");

            ResultSet res = dbc.SELECT("SELECT userId FROM Utility.users WHERE Token='" + token + "'");

            if(res.next()){
                return (res.getString("userId"));
            }else {
                return ("");
            }
    }
}
