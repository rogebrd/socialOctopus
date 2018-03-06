package API;

import Connection.DatabaseConnection;
import Connection.RDSConnection;
import Security.EncryptionManager;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;

import java.sql.ResultSet;

public class UserLogin {

    public void post(Context context){

        DatabaseConnection connection;

        LambdaLogger logger = context.getLogger();

        logger.log("Creating Connection...\n");
        connection = new RDSConnection("user", "password");

        String id = "TODO";
        String password = "TODO";

        try {
            logger.log("Connecting...\n");
            connection.connect();

            //validate
            EncryptionManager.decrypt(id);

            //select user
            ResultSet res = connection.SELECT("SELECT * FROM users WHERE userId=" + id + " AND password=" + password);

            //validate input
            //TODO

            logger.log("Disconnecting...\n");
            connection.disconnect();

        }catch(Exception e){
            logger.log("ERROR: " + e.getMessage() + "\n");
        }

    }
}
