package API;

import Connection.DatabaseConnection;
import Connection.RDSConnection;
import Security.EncryptionManager;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;

import java.sql.ResultSet;

public class UserCreate {

    public void post(Context context){
        DatabaseConnection connection;

        LambdaLogger logger = context.getLogger();

        logger.log("Creating Connection...\n");
        connection = new RDSConnection("user", "password");

        String id = "TODO";
        String password = "TODO";
        String name =  "TODO";

        try {
            logger.log("Connecting...\n");
            connection.connect();

            //validate
            EncryptionManager.decrypt(id);

            //check if userExists
            ResultSet res = connection.SELECT("SELECT * FROM users WHERE userId=" + id);

            //check size
            //TODO
            int size = 0;

            if(size == 0) {
                //create info if size = 0
                connection.INSERT("INSERT INTO users (userId, password, name) VALUES (" + id + "," + password + "," + name + ")");
            }

            logger.log("Disconnecting...\n");
            connection.disconnect();

        }catch(Exception e){
            logger.log("ERROR: " + e.getMessage() + "\n");
        }
    }
}
