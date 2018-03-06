package API;

import Connection.DatabaseConnection;
import Connection.RDSConnection;
import Security.EncryptionManager;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import org.json.simple.JSONObject;

import java.sql.ResultSet;

public class UserId {

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

            //select
            ResultSet res = connection.SELECT("SELECT * FROM users WHERE userId=" + id);

            //format
            JSONObject formattedResults = formatUser(res);

            logger.log("Disconnecting...\n");
            connection.disconnect();

            //return results
            return (formattedResults.toJSONString());

        }catch(Exception e){
            logger.log("ERROR: " + e.getMessage() + "\n");
        }

        return ("");
    }

    private JSONObject formatUser(ResultSet res){
        //TODO

        return null;
    }
}
