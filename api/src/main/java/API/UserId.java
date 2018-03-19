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
    public static final String UserId = "userId";
    public static final String Name = "name";
    public static final String ProfilePicUrl = "profilePicsLink";
    
    public String get(Object body, Context context){
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

            // Encryption manager return the (given the access token) user with the input access token and user id

            EncryptionManager.verify(connection, body);

            logger.log("Getting Input...\n");
          //  userId = postBody.get("username");

            // user ID is hard coded for now
            userId = "bradrogers";

            logger.log("Querying... User table and Setting table\n");
            //query for search
            ResultSet res1 = connection.SELECT("SELECT * FROM Utility.users u, Utility.settings s WHERE s.userId = u.userId AND (u.userId = '"+ userId+"');");


           logger.log("Querying... accounts table");
           ResultSet res2 = connection.SELECT("SELECT * FROM Utility.accounts where userId = '"+ userId+"' and visibility = 1;");

            logger.log("Formatting...\n");
            //Format results
            JSONObject formattedResults = formatSearch(res1,res2);

            logger.log("Disconnecting...\n");
            connection.disconnect();

            logger.log(formattedResults.toJSONString());

            return (formattedResults.toJSONString());

        }catch(Exception e){
            logger.log("ERROR: " + e.getMessage() + "\n");

            return ("{}");
        }
    }

    private JSONObject formatSearch(ResultSet res1, ResultSet res2) throws Exception {
            JSONObject results = new JSONObject();

            JSONArray Profile = new JSONArray();

            JSONObject person = new JSONObject();


                person.put(UserId, res1.getString("userId"));
                person.put(Name, res1.getString("name"));
                person.put(ProfilePicUrl, res1.getString("profilePicUrl"));
                person.put("Quotes", res1.getString("Quotes"));

                Profile.add(person);

                while (res2.next()) {
                    JSONObject socialMedia = new JSONObject();
                    socialMedia.put("type", res2.getString("type"));
                    socialMedia.put("socialMediaID", res2.getString("socialMediaID"));

                    Profile.add(socialMedia);
                }

                results.put("results", Profile);



        return results;
    }
}