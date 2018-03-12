package Security;

import Connection.DatabaseConnection;

import java.sql.ResultSet;

public class EncryptionManager {

    public static String encrypt(DatabaseConnection dbc, String token){
        try {
            ResultSet res = dbc.SELECT("SELECT userId FROM Utlity.users WHERE token='" + token + "'");

            if(res.next()){
                return (res.getString("userId"));
            }
        }catch(Exception e){

        }

        return ("");
    }
}
