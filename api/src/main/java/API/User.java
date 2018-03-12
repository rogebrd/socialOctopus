package API;

import Connection.DatabaseConnection;
import Connection.RDSConnection;
import Security.EncryptionManager;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import org.json.simple.JSONObject;

import java.sql.ResultSet;
import java.util.LinkedHashMap;

public class User {

    public String get(Object body, Context context){
        DatabaseConnection connection;

        LambdaLogger logger = context.getLogger();

        logger.log("Creating Connection...\n");
        connection = new RDSConnection();

        //LinkedHashMap<String, String> postBody = (LinkedHashMap<String, String>)(((LinkedHashMap<String, Object>) body).get("body"));

        String id = "TODO";

        try {
            logger.log("Connecting...\n");
            connection.connect();

            logger.log("Verifying...\n");
            EncryptionManager.verify(connection, body);

            //TODO write query
            ResultSet res = connection.SELECT("");

            JSONObject formattedResults = formatUserGet(res);

            logger.log("Disconnecting...\n");
            connection.disconnect();

            //return results
            return (formattedResults.toJSONString());

        }catch(Exception e){
            logger.log("ERROR: " + e.getMessage() + "\n");
        }

        return ("");
    }

    public String post(Object body, Context context){
        DatabaseConnection connection;

        LambdaLogger logger = context.getLogger();

        logger.log("Creating Connection...\n");
        connection = new RDSConnection("user", "password");

        LinkedHashMap<String, String> postBody = (LinkedHashMap<String, String>)(((LinkedHashMap<String, Object>) body).get("body"));

        String id = "TODO";

        try {
            logger.log("Connecting...\n");
            connection.connect();

            logger.log("Verifying...\n");
            EncryptionManager.verify(connection, body);

            //get update queries
            JSONObject queries = formatUserUpdates(id);

            //call queries
            //for(String s: queries.get("queries")){
            //    connection.UPDATE(s);
            //}

            logger.log("Disconnecting...\n");
            connection.disconnect();

        }catch(Exception e){
            logger.log("ERROR: " + e.getMessage() + "\n");
        }

        return ("");
    }

    private JSONObject formatUserGet(ResultSet res){
        //TODO

        return null;
    }

    private JSONObject formatUserUpdates(String input){
        //TODO

        return null;
    }
}
