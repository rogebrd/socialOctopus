package API;

import Connection.DatabaseConnection;
import Connection.RDSConnection;
import Security.EncryptionManager;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import org.json.simple.JSONObject;

import java.sql.ResultSet;

public class User {

    public String get(Context context){
        DatabaseConnection connection;

        LambdaLogger logger = context.getLogger();

        logger.log("Creating Connection...\n");
        connection = new RDSConnection("user", "password");

        String id = "TODO";

        try {
            logger.log("Connecting...\n");
            connection.connect();

            //validate
            EncryptionManager.decrypt(id);

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

    public String post(Context context){
        DatabaseConnection connection;

        LambdaLogger logger = context.getLogger();

        logger.log("Creating Connection...\n");
        connection = new RDSConnection("user", "password");

        String id = "TODO";

        try {
            logger.log("Connecting...\n");
            connection.connect();

            //validate
            EncryptionManager.decrypt(id);

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
