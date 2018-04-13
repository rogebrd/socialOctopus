package API;

import Connection.DatabaseConnection;
import Connection.RDSConnection;
import Security.EncryptionManager;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import org.json.simple.JSONObject;

import java.sql.ResultSet;
import java.util.LinkedHashMap;

public class UserCreate {

    public String post(Object body, Context context){
        DatabaseConnection connection;

        LambdaLogger logger = context.getLogger();

        logger.log("Creating Connection...\n");
        connection = new RDSConnection();

        LinkedHashMap<String, String> postBody = (LinkedHashMap<String, String>)(((LinkedHashMap<String, Object>) body).get("body"));

        String id = "";
        String password = "";
        String name =  "";
        int status = 0;
        JSONObject results = new JSONObject();

        try {
            logger.log("Connecting...\n");
            connection.connect();

            logger.log("Verifying...\n");
            EncryptionManager.verify(connection, body);

            logger.log("Getting Input...\n");
            //validate
            id = postBody.get("username");
            password = postBody.get("password");
            name = postBody.get("name");


            //check if userExists
            int i = connection.INSERT("INSERT INTO Utility.users(userId,password,name) VALUES('" + id +"','" + password+"','" + name+"')");
            // check if insert statement is successful
            if (i==0) {
                throw new Exception("Username Already Exists!");

            } else {
                status = 1;

            }

            // create instance in setting database and account database

           if (connection.INSERT("INSERT INTO Utility.accounts(userId) VALUES('" + id +"')")==0) {
                throw new Exception ("account database instance creation failed");

           }

            if (connection.INSERT("INSERT INTO Utility.settings(userId) VALUES('" + id +"')")==0) {
                throw new Exception ("settings database instance creation failed");

            }



            results.put("status",status);
            results.put("Message","Account Creation Successful!");




            logger.log("Disconnecting...\n");
            connection.disconnect();

        }catch(Exception e){
            logger.log("ERROR: " + e.getMessage() + "\n");
            results.put("status",status);
            results.put("Message",e.getMessage());
        }

        return (results.toJSONString());

    }
}
