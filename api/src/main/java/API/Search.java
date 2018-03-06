package API;

import Connection.DatabaseConnection;
import Connection.RDSConnection;
import Security.EncryptionManager;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import org.json.simple.JSONObject;

import java.sql.ResultSet;

public class Search {

    public String post(String term, Context context){
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

            //query for search
            //TODO update select query
            ResultSet res = connection.SELECT("SELECT * FROM users WHERE CONTAINS(userId," + term + ")");

            //Format results
            JSONObject formattedResults = formatSearch(res);

            logger.log("Disconnecting...\n");
            connection.disconnect();

            return (formattedResults.toJSONString());

        }catch(Exception e){
            logger.log("ERROR: " + e.getMessage() + "\n");
        }

        return ("");
    }

    private JSONObject formatSearch(ResultSet res){
        //TODO

        return null;
    }
}
