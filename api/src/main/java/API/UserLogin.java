package API;

import Connection.DatabaseConnection;
import Connection.RDSConnection;
import Security.EncryptionManager;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.sql.ResultSet;
import java.util.LinkedHashMap;
import java.util.UUID;

public class UserLogin extends LambdaSkeleton {

    public JSONObject process(DatabaseConnection connection, Object body, LambdaLogger logger) throws Exception {
        int status = 0;
        JSONObject results = new JSONObject();

        logger.log("Getting Input...\n");
        LinkedHashMap<String, String> postBody = (LinkedHashMap<String, String>)(((LinkedHashMap<String, Object>) body).get("body"));

        String token = UUID.randomUUID().toString();
        //validate
        String id = postBody.get("username");
        String password = postBody.get("password");

        logger.log("Querying...\n");
        //select user
        ResultSet res = connection.SELECT("SELECT userId FROM Utility.users WHERE userId='" + id + "' AND password='" + password + "';");

        //validate input
        logger.log("Processing Results...\n");
        if(!res.next()){
            //INVALID LOGIN
            logger.log("Invalid Login...\n");

            status = 0;

            throw new Exception("Invalid Login");
        }else{
            logger.log("Updating Login Info...\n");
            if(connection.UPDATE("UPDATE Utility.users SET Token='" + token + "' WHERE userId='" + id + "'") == 0){
                logger.log("Update Query Failed...\n");

                status = -1;
                //FAILED
                throw new Exception("Update Query Failed");
            }else{
                logger.log("Login Success...\n");
                //SUCCESS
                status = 1;
            }
        }

        results.put("status", status);
        results.put("token", token);

        return (results);
    }
}
