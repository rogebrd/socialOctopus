package API;

import Connection.DatabaseConnection;
import Connection.RDSConnection;
import Security.EncryptionManager;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import org.json.simple.JSONObject;

import java.sql.ResultSet;
import java.util.LinkedHashMap;

public class UserLogin {

    public int post(Object body, Context context){

        DatabaseConnection connection;

        LambdaLogger logger = context.getLogger();

        logger.log("Creating Connection...\n");
        connection = new RDSConnection();

        LinkedHashMap<String, String> postBody = (LinkedHashMap<String, String>) body;

        String deviceId = "";
        int status = -1;

        try {
            logger.log("Connecting...\n");
            connection.connect();

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
            }else{
                logger.log("Updating Login Info...\n");
                if(connection.UPDATE("UPDATE Utility.users SET deviceId='" + deviceId + "', loginStatus=1 WHERE userId='" + id + "'") == 0){
                    logger.log("Update Query Failed...\n");
                    //FAILED
                    status = -1;
                }else{
                    logger.log("Login Success...\n");
                    //SUCCESS
                    status = 1;
                }
            }

            logger.log("Disconnecting...\n");
            connection.disconnect();

            return (status);

        }catch(Exception e){
            logger.log("ERROR: " + e.getMessage() + "\n");
        }

        return (status);

    }
}
