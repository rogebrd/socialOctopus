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

public class UserLogin {

    public String post(Object body, Context context){

        DatabaseConnection connection;

        LambdaLogger logger = context.getLogger();

        logger.log("Creating Connection...\n");
        connection = new RDSConnection();

        LinkedHashMap<String, String> postBody = (LinkedHashMap<String, String>)(((LinkedHashMap<String, Object>) body).get("body"));

        String token = UUID.randomUUID().toString();
        int status = -1;

        JSONObject results = new JSONObject();

        try {
            logger.log("Connecting...\n");
            connection.connect();

            logger.log("Verifying...\n");
            //EncryptionManager.verify(connection, body);

            logger.log("Getting Input...\n");
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

            logger.log("Disconnecting...\n");
            connection.disconnect();

            results.put("status", status);
            results.put("token", token);

            return (results.toJSONString());

        }catch(Exception e){
            logger.log("ERROR: " + e.getMessage() + "\n");

            results.put("status", status);
            results.put("message", e.getMessage());

            return (results.toJSONString());
        }
    }
}
