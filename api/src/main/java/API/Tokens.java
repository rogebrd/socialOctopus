package API;

import Connection.DatabaseConnection;
import Connection.RDSConnection;
import Security.EncryptionManager;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import org.json.simple.JSONObject;

import java.sql.ResultSet;
import java.util.LinkedHashMap;

public class Tokens {

    @Deprecated
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

            //query to get tokens
            ResultSet res = connection.SELECT("SELECT * FROM tokens WHERE userId=" + id);

            //format tokens
            JSONObject formattedResults = formatTokens(res);

            logger.log("Disconnecting...\n");
            connection.disconnect();

            //return results
            return (formattedResults.toJSONString());

        }catch(Exception e){
            logger.log("ERROR: " + e.getMessage() + "\n");
        }

        return ("");
    }

    @Deprecated
    private JSONObject formatTokens(ResultSet res){
        //TODO

        return null;
    }
}
