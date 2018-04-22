package API;

import Connection.DatabaseConnection;
import Connection.RDSConnection;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import org.json.simple.JSONObject;

import java.util.LinkedHashMap;

public abstract class LambdaSkeleton {

    public String handle(Object body, Context context){
        DatabaseConnection connection;

        LambdaLogger logger = context.getLogger();

        logger.log("Creating Connection...\n");
        connection = new RDSConnection();

        JSONObject results = new JSONObject();

        try{
            logger.log("Connecting...\n");
            connection.connect();

            results = process(connection, body, logger);


        }catch(Exception e){
            logger.log("ERROR: " + e.getMessage() + "\n");

            results.put("status", -1);
            results.put("message", e.getMessage());
        }finally{
            logger.log("Disconnecting...\n");
            try {
                connection.disconnect();
            }catch(Exception e){}
        }

        return (results.toJSONString());
    }

    public abstract JSONObject process(DatabaseConnection connection, Object body, LambdaLogger logger) throws Exception;
}
