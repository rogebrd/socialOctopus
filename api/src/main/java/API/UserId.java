package API;

import Connection.DatabaseConnection;
import Connection.RDSConnection;
import Security.EncryptionManager;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.sql.ResultSet;
import java.util.LinkedHashMap;


// get user's public information for a third party
public class UserId {
    
    public String post(Object body, Context context){
        DatabaseConnection connection;

        LambdaLogger logger = context.getLogger();

        logger.log("Creating Connection...\n");
        connection = new RDSConnection();
        String userId = "";
        LinkedHashMap<String, String> postBody = (LinkedHashMap<String, String>)(((LinkedHashMap<String, Object>) body).get("body"));
        int status = 0;


        try {
            logger.log("Connecting...\n");
            connection.connect();

            logger.log("Verifying...\n");
            EncryptionManager.verify(connection, body);

            logger.log("Getting Input...\n");
            userId = postBody.get("username");

            logger.log("Querying...\n");
            //query for search
            ResultSet res = connection.SELECT("SELECT * FROM Utility.users u,Utility.settings s, Utility WHERE u.userId = s.userId AND (u.userId LIKE '%" + term + "%' OR u.name LIKE '%" + term + "%')");

            logger.log("Formatting...\n");
            //Format results
            JSONObject formattedResults = formatSearch(res);

            logger.log("Disconnecting...\n");
            connection.disconnect();

            logger.log(formattedResults.toJSONString());

            return (formattedResults.toJSONString());

        }catch(Exception e){
            logger.log("ERROR: " + e.getMessage() + "\n");

            return ("{}");
        }
    }

    private JSONObject formatSearch(ResultSet res) throws Exception {
        JSONObject results = new JSONObject();

        JSONArray people = new JSONArray();
        while(res.next()){
            JSONObject person = new JSONObject();

            person.put(userId, res.getString(userId));
            person.put(name, res.getString(name));
            person.put(profilePicUrl, res.getString(profilePicUrl));

            people.add(person);
        }
        results.put("results", people);

        return results;
    }
}